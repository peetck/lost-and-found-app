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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <AppHeader title="Lost & Found" />

          <View style={styles.categoryContainer}>
            <Box title="Phone" color="#003F5C" />
            <Box title="Card" color="#955196" />
            <Box title="Earphone" color="#FF6E54" />
          </View>

          <View style={styles.categoryContainer}>
            <Box title="Wallet" color="#444E86" />
            <Box title="Key" color="#DD5182" />
            <Box title="Other" color="#FFA600" />
          </View>

          <View style={{ paddingVertical: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <MyText style={{ fontFamily: "kanit", fontSize: 20 }}>
                List of items
              </MyText>
              <MyText style={{ fontFamily: "kanit", fontSize: 20 }}>
                See all
              </MyText>
            </View>
            <PostList data={["Sushi 1", "Sushi 2", "Sushi 3", "Sushi 4"]} />
          </View>
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
  },
  categoryContainer: {
    flexDirection: "row",
    paddingTop: 35,
    paddingBottom: 20,
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
