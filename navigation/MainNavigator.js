import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";

import { AuthNavigator } from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";

const MainNavigator = (props) => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
