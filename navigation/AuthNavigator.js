import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen from "../screens/AuthScreen";

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = (props) => {
  return (
    <AuthStackNavigator.Navigator headerMode="none">
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};
