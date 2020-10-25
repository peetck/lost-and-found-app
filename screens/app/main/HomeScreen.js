import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import firebase from "firebase";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CategoryList from "../../../components/app/main/CategoryList";
import MyText from "../../../components/UI/MyText";
import PostList from "../../../components/app/main/PostList";
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";

const HomeScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => {
          props.navigation.navigate("Search");
        }}
        activeOpacity={0.6}
      >
        <Ionicons
          name={Platform.OS === "android" ? "md-search" : "ios-search"}
          size={20}
          color="black"
          style={styles.searchIcon}
        />
        <MyText style={styles.searchText}>Search</MyText>
      </TouchableOpacity>

      <CategoryList />

      <View style={styles.listContainer}>
        <View style={styles.listContainerHeader}>
          <MyText style={styles.title}>List of items</MyText>
          <MyText style={styles.title}>See all</MyText>
        </View>
        <PostList
          data={[
            { id: "1", title: "Sushi 1", color: "#003F5C" },
            { id: "2", title: "Sushi 2", color: "#955196" },
            { id: "3", title: "Sushi 3", color: "#FF6E54" },
            { id: "4", title: "Sushi 4", color: "#444E86" },
            { id: "5", title: "Sushi 5", color: "#DD5182" },
            { id: "6", title: "Sushi 6", color: "#FFA600" },
          ]}
          navigation={props.navigation}
        />
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 25,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  listContainerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  searchIcon: {
    padding: 8,
  },
  searchText: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 16,
  },
  title: {
    fontFamily: "kanit",
    fontSize: 19,
  },
});

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Home",
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          color="black"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-add"
          color="black"
          onPress={() => {
            navigationData.navigation.navigate("CreatePost");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default HomeScreen;
