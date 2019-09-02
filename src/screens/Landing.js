import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {background, titleText} from '../common/colors';
import NumericInput from 'react-native-numeric-input';

const Landing = () => {
  const [textValue, setTextValue] = useState('');
  const [todos, addTodos] = useState([]);

  const mappedTodos = todos.map(todo => {
    return (
      <TouchableOpacity style={{width: '90%', height: 80, backgroundColor: "blue"}}>
        <Text style={{color: "#fff"}}>{todo}</Text>
      </TouchableOpacity>
    );
  });

  addTodo = todo => {
    addTodos([...todos, todo]);
    setTextValue('');
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.textTitle}>To Dos</Text>
        </View>
        <View
          style={styles.textInputView}>
          <TextInput
            value={textValue}
            onChangeText={value => setTextValue(value)}
            style={styles.textInput}/>
            <View style={{justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={{backgroundColor: '#000', justifyContent:'center', width: 60, height: 50}}
            onPress={() => addTodo(textValue)}>
            <Text style={{color: '#fff', alignSelf: 'center', textAlign:'center'}}>Add{"\n"} Todo</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop:'2%'}}>
          {todos.length !== 0 ? (
            mappedTodos
          ) : (
            <Text style={styles.text}>No To Dos yet</Text>
          )}
        </View>
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
    marginTop: 15
  },textInputView:{flexDirection: 'row',
  width: '90%',
  justifyContent: 'center',
  height: 40,
  alignSelf: 'center'},
  text: {
    alignSelf: 'center',
    fontSize: 20,
  },
  textInput: {
    justifyContent:'center',
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
});
