import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen, {
  screenOptions as loginScreenOptions,
} from "../../screens/auth/LoginScreen";
import SignUpScreen, {
  screenOptions as signUpScreenOptions,
} from "../../screens/auth/SignUpScreen";
import NextSignUpScreen, {
  screenOptions as nextSignUpScreenOptions,
} from "../../screens/auth/NextSignUpScreen";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = (props) => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="SignUp"
        component={SignUpScreen}
        options={signUpScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="NextSignUp"
        component={NextSignUpScreen}
        options={nextSignUpScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
