import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useDispatch } from "react-redux";

import AuthNavigator from "../navigation/auth/AuthNavigator";
import DrawerNavigator from "../navigation/app/DrawerNavigator";
import Colors from "../constants/Colors";
import { autoLogin } from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let init = true;
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        if (init) {
          // if login success from auto login
          await dispatch(autoLogin(user));
          init = false;
        }
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setIsLoading(false);
    });
    // clean up function
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <ActionSheetProvider>
        {isAuth ? <DrawerNavigator /> : <AuthNavigator />}
      </ActionSheetProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
