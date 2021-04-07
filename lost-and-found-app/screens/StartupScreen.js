import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Root } from "popup-ui";

import AuthNavigator from "../navigation/auth/AuthNavigator";
import DrawerNavigator from "../navigation/app/DrawerNavigator";
import { loginSuccess, fetchLocation } from "../store/actions/user";
import { fetchCategories } from "../store/actions/categories";
import Loader from "../components/UI/Loader";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.user.idToken);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchLocation());
    };
    init();
  }, []);

  if (isLoading) {
    return <Loader visible={isLoading} alpha={1} />;
  }

  return (
    <Root>
      <NavigationContainer>
        <ActionSheetProvider>
          {idToken !== "" ? <DrawerNavigator /> : <AuthNavigator />}
        </ActionSheetProvider>
      </NavigationContainer>
    </Root>
  );
};

export default StartupScreen;
