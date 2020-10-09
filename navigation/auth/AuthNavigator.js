import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../../screens/auth/LoginScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";

const AuthStackNavigator = createStackNavigator();

const screenOptions = {
  animationEnabled: false,
};

const AuthNavigator = (props) => {
  return (
    <AuthStackNavigator.Navigator
      headerMode="none"
      screenOptions={screenOptions}
    >
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
