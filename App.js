import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import firebase from "firebase";

import StartupScreen from "./screens/StartupScreen";

const firebaseConfig = {
  apiKey: "AIzaSyAZ4-xmgwetmvZo105AOa7Y23hs8neXAfs",
  authDomain: "lost-and-found-app-57469.firebaseapp.com",
  databaseURL: "https://lost-and-found-app-57469.firebaseio.com",
  projectId: "lost-and-found-app-57469",
  storageBucket: "lost-and-found-app-57469.appspot.com",
  messagingSenderId: "648040158261",
  appId: "1:648040158261:web:368f7f888fba3f585c0d7c",
  measurementId: "G-Z4DKW64NF4",
};

firebase.initializeApp(firebaseConfig);

// const rootReducer = combineReducers({

// });

// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    kanit: require("./assets/fonts/Kanit-Regular.ttf"),
    "kanit-light": require("./assets/fonts/Kanit-Light.ttf"),
    "kanit-bold": require("./assets/fonts/Kanit-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return <StartupScreen />;
}
