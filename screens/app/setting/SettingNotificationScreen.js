import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";


import SettingItem from "../../../components/app/setting/SettingItem"

const SettingNotificationScreen = (props) => {
  return (
    <View style={styles.screen}>
     
      <SettingItem HeaderText="Change notification sound" title="sound" 
        //onPress={() => { props.navigation.navigate(""); }}
        />
         
   
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },contentContainer: {
    flex: 1,
    alignItems: "center",
  }
});

export const screenOptions = {
  headerTitle: "My Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default SettingNotificationScreen;
