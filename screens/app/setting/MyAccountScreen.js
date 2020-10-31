import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, ScrollView,AppHeader } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";



import SettingItem from "../../../components/app/setting/SettingItem"


const MyAccountScreen = (props) => {


  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.contentContainer}>
      <SettingItem HeaderText="Change Email" title="email" 
        onPress={() => { props.navigation.navigate("ChangeEmail"); }}/>
         <SettingItem HeaderText="Change Password" title="pass" 
        onPress={() => { props.navigation.navigate("ChangePassword"); }}/>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  }
  
});

export const screenOptions = {};

export default MyAccountScreen;
