import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import firebase from "firebase";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import PostList from "../../components/app/PostList";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/images/logo.png")}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <MyText
            style={{
              fontSize: 35,
              fontFamily: "kanit-bold",
            }}
          >
            Lost & Found
          </MyText>
        </View>
      </View>

        <PostList data={["dummy1"]} />

      <MyButton
        title="DUMMY LOGOUT"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});

export default HomeScreen;
