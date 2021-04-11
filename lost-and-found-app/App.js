import React, { useState, useEffect, Suspense } from "react";
import { YellowBox } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import i18n from "i18n-js";
import "react-native-gesture-handler";

import userReducer from "./store/reducers/user";
import postsReducer from "./store/reducers/posts";
import categoriesReducer from "./store/reducers/categories";
import chatsReducer from "./store/reducers/chats";
import { loadLanguageSetting } from "./shared/storage";
import Loader from "./components/UI/Loader";

// remove setTimeout() warning
YellowBox.ignoreWarnings(["Setting a timer"]);

i18n.translations = {
  en: require("./locales/en.json"),
  th: require("./locales/th.json"),
};

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  categories: categoriesReducer,
  chats: chatsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    kanit: require("./assets/fonts/Kanit-Regular.ttf"),
    "kanit-light": require("./assets/fonts/Kanit-Light.ttf"),
    "kanit-bold": require("./assets/fonts/Kanit-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // loadLanguageSetting before StartupScreen
  const StartupScreen = React.lazy(() => import("./screens/StartupScreen"));

  useEffect(() => {
    loadLanguageSetting();
  }, []);

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

  return (
    <Provider store={store}>
      <Suspense fallback={<Loader visible={true} alpha={1} />}>
        <StartupScreen />
      </Suspense>
    </Provider>
  );
}
