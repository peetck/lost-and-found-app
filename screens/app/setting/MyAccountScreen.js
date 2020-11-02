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
      <SettingItem HeaderText="Tel" title="081 000 0000" 
        onPress={() => { }} color = 'default' />
      <SettingItem HeaderText="Change Email" title="Registered" 
        onPress={() => { props.navigation.navigate("ChangeEmail"); }} color = 'default' />
      <SettingItem HeaderText="Change Password" title="Registered" 
        onPress={() => { props.navigation.navigate("ChangePassword"); }} color = 'default' />
      <SettingItem HeaderText="Delete Account" title="Delete" 
        onPress={() => { }} color = 'red' />
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
  }
  
});

export const screenOptions = {};

export default MyAccountScreen;
