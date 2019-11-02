import PushNotification from 'react-native-push-notification';
import {DeviceEventEmitter} from 'react-native'

 class PushNotificationAndroid {
   

  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);

    this.lastId = 0;
  }

  configure = (onRegister, onNotification) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: onRegister, //this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification, //this._onNotification,

    
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  localNotif() {
    this.lastId++;

    let config = {
        /* Android Only Properties */
        id: ''+this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        ticker: "My Notification Ticker", // (optional)
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        subText: "This is a subText", // (optional) default: none
        color: "red", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification
  
        /* iOS only properties */
        alertAction: 'view', // (optional) default: view
        category: null, // (optional) default: null
        userInfo: null, // (optional) default: null (object containing additional notification data)
  
        /* iOS and Android properties */
        title: "Todos", // (optional)
        message: "todos", // (required)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        actions: '["Add Todo", "View"]',  // (Android only) See the doc for notification actions to know more
      }
    PushNotification.localNotification(config);
    PushNotification.registerNotificationActions(['Add Todo','View'])
  }

  scheduleNotif() {
    this.lastId++;
    
    let config = {
        date: new Date(Date.now() + (30 * 1000)), // in 30 secs
  
        /* Android Only Properties */
        id: ''+this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        ticker: "My Notification Ticker", // (optional)
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
        smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
        subText: "This is a subText", // (optional) default: none
        color: "blue", // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: "group", // (optional) add group to message
        ongoing: false, // (optional) set whether this is an "ongoing" notification
  
        /* iOS and Android properties */
        title: "Todos", // (optional)
        message: "My Notification Message", // (required)
        playSound: true, // (optional) default: true
        soundName: 'default'
      }


    PushNotification.localNotificationSchedule(config);
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: ''+this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  

}

export default PushNotificationAndroid