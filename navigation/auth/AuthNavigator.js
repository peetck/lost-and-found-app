import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthScreen from "../../screens/auth/AuthScreen";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = (props) => {
  return (
    <AuthStackNavigator.Navigator headerMode="none">
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthNavigator;
