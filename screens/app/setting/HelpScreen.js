import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";


const HelpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Help SCREEN</Text>
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
});

export const screenOptions = {
  headerTitle: "My Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default HelpScreen;
