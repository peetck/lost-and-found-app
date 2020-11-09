import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  AppHeader,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { useSelector, useDispatch } from "react-redux";

import SettingItem from "../../../components/app/settings/SettingItem";

const ChangeNameSettingScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  {
    /* state */
  }
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  {
    /* function */
  }
  const checkTwoPassword = () => {
    if (newPassword == confirmPassword) {
      const authNewPassword = newPassword;
      console.log(authNewPassword);
    }
  };

  {
    /* return */
  }
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>New Password</Text>
      <Text style={styles.bodyContent}>Set a new password.</Text>
      <TextInput
        style={styles.password}
        secureTextEntry={true}
        onChangeText={(text) => {
          setNewPassword(text);
        }}
        placeholder="New Password"
        value={newPassword}
      />
      <TextInput
        style={styles.checkPassword}
        secureTextEntry={true}
        onChangeText={(text) => {
          setConfirmPassword(text);
        }}
        placeholder="Confirm Password"
        value={confirmPassword}
      />
      <View style={{ marginTop: 12 }}>
        <Button
          title="Change"
          color="#3fc5f0"
          onPress={checkTwoPassword}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  password: {
    borderWidth: 0.5,
    borderRadius: 3,
    height: 41,
    fontSize: 19,
    paddingHorizontal: 7,
    alignContent: "space-between",
    fontFamily: "kanit-light",
  },
  content: {
    fontSize: 12,
    marginBottom: 4,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  checkPassword: {
    borderWidth: 0.5,
    borderRadius: 3,
    height: 41,
    fontSize: 19,
    paddingHorizontal: 7,
    marginTop: 13,
    marginBottom: 6,
    fontFamily: "kanit-light",
  },
  header: {
    fontSize: 28,
    fontFamily: "kanit-bold",
    marginBottom: 4,
    marginTop: 6,
  },
  bodyContent: {
    fontSize: 14,
    marginBottom: 23,
    fontFamily: "kanit-light",
  },
});

export const screenOptions = {
  title: "Change Password",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default ChangeNameSettingScreen;
