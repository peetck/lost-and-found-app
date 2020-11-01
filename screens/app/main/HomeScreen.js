import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CategoryList from "../../../components/app/main/CategoryList";
import MyText from "../../../components/UI/MyText";
import PostList from "../../../components/app/main/PostList";
import Colors from "../../../constants/Colors";
import HeaderButton from "../../../components/UI/HeaderButton";
import { fetchAllPosts } from "../../../store/actions/posts";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts.posts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPosts = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(fetchAllPosts(1000));
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const header = (
    <View style={styles.headerContainer}>
      <View style={styles.userContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: user.imageUrl,
          }}
        />
        <View style={styles.userInfoContainer}>
          <MyText style={styles.nickname}>{user.nickname}</MyText>
          <MyText style={styles.email}>{user.email}</MyText>
        </View>
      </View>

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

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>Nearby items (1000 km)</MyText>
        <MyText style={styles.title}>See all</MyText>
      </View>
    </View>
  );

  return (
    <PostList
      data={posts}
      navigation={props.navigation}
      header={header}
      onRefresh={loadPosts}
      refreshing={isRefreshing}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 25,
    paddingHorizontal: 15,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingLeft: 25,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  nickname: {
    fontSize: 25,
    fontFamily: "kanit",
  },
  email: {
    color: Colors.grey,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Home",
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    cardStyle: {
      backgroundColor: "white",
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
