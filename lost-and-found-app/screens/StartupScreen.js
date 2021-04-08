import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useDispatch, useSelector } from "react-redux";
import { Root } from "popup-ui";
import jwt_decode from "jwt-decode";

import AuthNavigator from "../navigation/auth/AuthNavigator";
import DrawerNavigator from "../navigation/app/DrawerNavigator";
import {
  loginSuccess,
  fetchLocation,
  logout,
  tryRefreshToken,
} from "../store/actions/user";
import { fetchCategories } from "../store/actions/categories";
import Loader from "../components/UI/Loader";
import { loadIdToken, loadRefreshToken } from "../shared/storage";

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const idToken = useSelector((state) => state.user.idToken);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await dispatch(fetchLocation());
      await dispatch(fetchCategories());

      // auto login
      const idTokenFromStorage = await loadIdToken();
      const refreshTokenFromStorage = await loadRefreshToken();
      if (idTokenFromStorage && refreshTokenFromStorage) {
        const userData = jwt_decode(idTokenFromStorage);
        if (Date.now() < userData.exp * 1000) {
          // valid token
          await dispatch(
            loginSuccess(idTokenFromStorage, refreshTokenFromStorage)
          );
        } else {
          try {
            await dispatch(
              tryRefreshToken(refreshTokenFromStorage, userData.sub)
            );
          } catch (err) {
            await dispatch(logout());
          }
        }
      }
      setIsLoading(false);
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
