import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import CategoryList from "../../../components/app/main/CategoryList";
import MyText from "../../../components/UI/MyText";
import PostList from "../../../components/app/main/PostList";
import colors from "../../../shared/colors";
import { fetchAllPosts } from "../../../store/actions/posts";

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.posts);
  const currentLocation = useSelector((state) => state.user.location);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadPosts = useCallback(async () => {
    await dispatch(fetchAllPosts(currentLocation, 10));
  }, [dispatch, currentLocation]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts, isFocused]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadPosts();
    setIsRefreshing(false);
  };

  const header = (
    <View>
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
        <MyText style={styles.searchText}>Search by location</MyText>
      </TouchableOpacity>

      <CategoryList />

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>Nearby posts (~10 km)</MyText>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <PostList
        data={posts}
        navigation={props.navigation}
        header={header}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
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
    backgroundColor: colors.lightGrey,
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
    color: colors.grey,
  },
});

export const screenOptions = {
  headerShown: false,
};

export default HomeScreen;
