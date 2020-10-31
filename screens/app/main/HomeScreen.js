import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CategoryList from "../../../components/app/main/CategoryList";
import MyText from "../../../components/UI/MyText";
import PostList from "../../../components/app/main/PostList";
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";
import { fetchPosts } from "../../../store/actions/posts";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  const loadPosts = useCallback(async () => {
    await dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

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
        <PostList data={posts} navigation={props.navigation} />
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

export const screenOptions = (navData) => {
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
            navData.navigation.toggleDrawer();
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
            navData.navigation.navigate("CreatePost");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default HomeScreen;
