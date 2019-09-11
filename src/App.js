import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  DeviceEventEmitter
} from 'react-native';
import Landing from './screens/Landing'
const App = () => {

  useEffect(()=>{
    DeviceEventEmitter.addListener('notificationActionReceived', function(action){
      console.log('event listener added')
      console.log ('Notification action received: ' + action);
      const info = JSON.parse(action.dataJSON);
      if (info.action == 'Add Todo') {
        return console.log("add todo")
      } else if (info.action == 'View') {
        return console.log("view")
      }
      // Add all the required actions handlers
    });
    return ()=> {
      DeviceEventEmitter.removeListener('notificationActionReceived', ()=> console.log("notificationActionListenerRemoved"))
    }

  })
  return (
   <>
   <Landing/>
   </>
  );
};



export default App;
