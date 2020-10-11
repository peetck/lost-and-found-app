import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Constants from "expo-constants";
import firebase from "firebase";

import MyButton from "../../components/UI/MyButton";

const HomeScreen = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text>HOME SCREEN</Text>
      <MyButton
        title="DUMMY LOGOUT"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
  },
});

export default HomeScreen;
