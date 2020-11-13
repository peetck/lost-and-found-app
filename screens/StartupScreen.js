import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useDispatch } from "react-redux";
import { Root } from "popup-ui";

import AuthNavigator from "../navigation/auth/AuthNavigator";
import DrawerNavigator from "../navigation/app/DrawerNavigator";
import { loginSuccess, fetchLocation } from "../store/actions/user";
import { fetchCategories } from "../store/actions/categories";
import Loader from "../components/UI/Loader";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let isAutoLogin = true;

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchLocation());
      firebase.auth().onAuthStateChanged(async (user) => {
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
    init();
    // clean up function
    // return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Loader visible={isLoading} alpha={1} />;
  }

  return (
    <Root>
      <NavigationContainer>
        <ActionSheetProvider>
          {isAuth ? <DrawerNavigator /> : <AuthNavigator />}
        </ActionSheetProvider>
      </NavigationContainer>
    </Root>
  );
};

export default StartupScreen;
