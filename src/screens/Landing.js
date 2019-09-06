import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Icon } from 'native-base'
import {background, titleText} from '../common/colors';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';
import { guidGenerator } from '../utils/guid'


const Landing = () => {
  const [textValue, setTextValue] = useState('');
  const [todos, addTodos] = useState([]);
  const [options, showOptions] = useState(false)

storeData = async (data) => {
  try {
    console.log([...data])
    await AsyncStorage.setItem('todos', JSON.stringify(data))
  } catch (e) {
    console.log(e)
  }
}

getData = async () => {
  try {
    console.log("getData running")
    const value = await AsyncStorage.getItem('todos')
    if(value !== null) {
     return  console.log(value),
          addTodos(JSON.parse(value))
     
    } else console.log("data is null")
  } catch(e) {
    console.log(e)
  }
}

deleteTodo = (id) => {
  console.log("delete running")
  return todos.filter(todo =>  todo !== id)
}

useEffect(() => {
  console.log('component mounting')
  getData()
  return () => {
    console.log("component unmounting")
    storeData(todos)
  }
},[])

useEffect(() => {
  storeData(todos);
}, [todos])

  const mappedTodos = todos.map((todo, i) => {
    return (
      !showOptions ? <TouchableOpacity key={todo.id} style={{width: '90%', height: 80, backgroundColor: "blue"}} onPress={()=> showOptions(true)}>
        <Text style={{fontSize: 30}}>{todo.title}</Text><Icon name="close-circle-outline" onPress={()=> deleteTodo(todo.id)}/>
      </TouchableOpacity> : <TouchableOpacity key={todo.id} style={{width: '90%', height: 80, backgroundColor: "blue", justifyContent: 'space-between'}} onPress={()=> showOptions(true)}>
        <Text style={{fontSize: 30}}>{todo.title}</Text><Icon name="close-circle-outline" onPress={()=> deleteTodo(todo.id)}/>
      </TouchableOpacity>
    );
  });

  addTodo = todoText => {
    const todo = {
      title: todoText,
      id: guidGenerator()
    }
    addTodos([...todos, todo]);
    setTextValue('');
    console.log(todos)
    
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
            onPress={()=>addTodo(textValue)}>
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
    borderColor: 'black',
    borderWidth: 1,
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
