import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import {Icon} from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import {background, titleText} from '../common/colors';
import AsyncStorage from '@react-native-community/async-storage';
import {guidGenerator} from '../utils/guid';
import appConfig from '../../app.json'
import PushNotificationAndroid from '../common/PushNotificationAndroid'

const Landing = () => {
  const [textValue, setTextValue] = useState('');
  const [todos, addTodos] = useState([]);
  const [options, showOptions] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [senderID, setSenderID] = useState(appConfig.senderID)

  storeData = async data => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      if (value !== null) {
        return addTodos(JSON.parse(value));
      } else console.log('data is null');
    } catch (e) {
      console.log(e);
    }
  };

  turnNotificationOn = () => {
    setSwitchOn(!switchOn);
    this.PushNotificationAndroid.localNotif()
    if(switchOn === false){
      this.PushNotificationAndroid.cancelNotif()
    }
  };

  deleteTodo = id => {
    return addTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    console.log('component mounting');
    this.PushNotificationAndroid = new PushNotificationAndroid(this.onNotif)
     
    getData();
    Keyboard.addListener(
      'keyboardDidShow')
      Keyboard.addListener(
        'keyboardDidHide')
    return () => {
      console.log('component unmounting');
      storeData(todos);
      Keyboard.removeListener(
        'keyboardDidShow',  ()=> console.log("keyboarddidhow removed"))
        Keyboard.removeListener(
          'keyboardDidHide', ()=> console.log("keyboarddidhide removed"))
        
    };
  }, []);

  useEffect(() => {
    storeData(todos);
  }, [todos]);

  const mappedTodos = todos.map((todo, i) => {
    return !showOptions ? (
      <TouchableOpacity
        key={todo.id}
        style={{width: '90%', height: 80, backgroundColor: 'blue', marginTop: 5, justifyContent: 'space-between',}}
        onPress={() => showOptions(true)}>
        <Text style={{fontSize: 30}}>{todo.title}</Text>
        <Icon name="close-circle-outline" onPress={() => deleteTodo(todo.id)} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        key={todo.id}
        style={{
          width: '90%',
          height: 80,
          backgroundColor: 'blue',
          justifyContent: 'space-between',
          marginTop: 5
        }}
        onPress={() => showOptions(true)}>
        <Text style={{fontSize: 30}}>{todo.title}</Text>
        <Icon name="close-circle-outline" onPress={() => deleteTodo(todo.id)} />
      </TouchableOpacity>
    );
  });

  addTodo = todoText => {
    const todo = {
      title: todoText,
      id: guidGenerator(),
    };
    addTodos([...todos, todo]);
    setTextValue('');
    Keyboard.dismiss()
  };

  onNotif = notif => {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.textTitle}>To Dos</Text>
        </View>
        <View style={styles.textInputView}>
          <TextInput
            value={textValue}
            onChangeText={value => setTextValue(value)}
            style={styles.textInput}
          />
          <View style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                justifyContent: 'center',
                width: 60,
                height: 50,
              }}
              onPress={() => addTodo(textValue)}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                Add{'\n'} Todo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView bounces={false} style={{flex: 1}} contentContainerStyle={styles.todosContainer}>
          {todos.length !== 0 ? (
            mappedTodos
          ) : (
            <Text style={styles.text}>No To Dos yet</Text>
          )}
        </ScrollView>
        {todos.length !== 0 ? (
          <View style={styles.toggleView}>
            <SwitchToggle
              containerStyle={styles.toggleContainer}
              circleStyle={styles.circleStyle}
              switchOn={switchOn}
              onPress={() => turnNotificationOn()}
              circleColorOff="white"
              circleColorOn="red"
              duration={500}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  textTitle: {
    color: 'green',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  textInputView: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    height: 40,
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  textInput: {
    justifyContent: 'center',
    width: '90%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'center',
  },
  todosButton: {
    height: 50,
    width: '90%',
  },
  circleStyle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'white',
  },
  toggleContainer: {
    marginTop: 16,
    width: 108,
    height: 48,
    borderRadius: 25,
    backgroundColor: '#ccc',
    padding: 5,
  },
  toggleView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '3%',
    marginRight: '3%',
  },
  todosContainer: {
    alignItems: 'center',
    marginTop: '2%',
  },
});
