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
import i18n from "i18n-js";

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
  const initialCategories = useSelector((state) =>
    state.categories.categories.map((category) => category.id)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategories
  );
  const [showPosts, setShowPosts] = useState(posts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadPosts = useCallback(async () => {
    try {
      await dispatch(fetchAllPosts(currentLocation, 5));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentLocation]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts, isFocused]);

  useEffect(() => {
    setShowPosts(
      posts.filter((post) => selectedCategories.includes(post.categoryId))
    );
  }, [selectedCategories, posts]);

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
          source={
            user.imageUrl
              ? {
                  uri: user.imageUrl,
                }
              : null
          }
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
        <MyText style={styles.searchText}>
          {i18n.t("homeScreen.searchByLocation")}
        </MyText>
      </TouchableOpacity>

      <CategoryList
        inputMode
        many
        value={selectedCategories}
        onChange={setSelectedCategories}
      />

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>{i18n.t("homeScreen.nearBy")}</MyText>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <PostList
        data={showPosts}
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
