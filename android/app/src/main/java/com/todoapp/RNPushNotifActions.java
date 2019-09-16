package com.todoapp;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import javax.annotation.Nullable;
import com.facebook.react.bridge.Arguments;

public class RNPushNotifActions extends ReactContextBaseJavaModule {


    RNPushNotifActions(ReactApplicationContext reactContext) {
        super(reactContext);

    }



    @Override
    public String getName() {
        return "RNPushNotifActions";
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

        sendEvent(reactContext, "notificationActionReceived", params);


    }



    WritableMap params = Arguments.createMap();
}
