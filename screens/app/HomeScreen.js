import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
  FlatList,
} from "react-native";
import firebase from "firebase";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import AppHeader from "../../components/app/AppHeader";
import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import PostList from "../../components/app/PostList";

const Box = (props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: 20, height: 20, backgroundColor: props.color }} />
      <MyText style={{ paddingTop: 5 }}>{props.title}</MyText>
    </View>
  );
};

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <AppHeader title="Lost & Found" />

      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Box title="Phone" color="#003F5C" />
          <Box title="Card" color="#955196" />
          <Box title="Earphone" color="#FF6E54" />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Box title="Wallet" color="#444E86" />
          <Box title="Key" color="#DD5182" />
          <Box title="Other" color="#FFA600" />
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <MyText style={{ fontSize: 25, fontFamily: "kanit-bold" }}>
          List of items
        </MyText>
        <PostList data={["1", "2", "3", "4"]} />
      </View>

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

export const screenOptions = {
  title: "Home",
  tabBarIcon: ({ size, color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-home" : "ios-home"}
      size={size}
      color={color}
    />
  ),
};

export default HomeScreen;
