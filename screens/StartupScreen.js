import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useDispatch } from "react-redux";

import AuthNavigator from "../navigation/auth/AuthNavigator";
import DrawerNavigator from "../navigation/app/DrawerNavigator";
import colors from "../shared/colors";
import { loginSuccess, fetchLocation } from "../store/actions/user";
import { fetchCategories } from "../store/actions/categories";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let isAutoLogin = true;

  const init = async () => {
    await dispatch(fetchCategories());
    await dispatch(fetchLocation());

    return firebase.auth().onAuthStateChanged(async (user) => {
      setIsLoading(true);
      if (user) {
        if (isAutoLogin) {
          // if firebase autologin success -> fetch user data
          await dispatch(loginSuccess());
        }
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setIsLoading(false);
      isAutoLogin = false;
    });
  };

  useEffect(() => {
    const unsubscribe = init();

    // clean up function
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
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
