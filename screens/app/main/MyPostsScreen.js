import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import PostList from "../../../components/app/main/PostList";
import { fetchMyPosts } from "../../../store/actions/posts";
import MyText from "../../../components/UI/MyText";
import CategoryList from "../../../components/app/main/CategoryList";

const MyPostsScreen = (props) => {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state) => state.user.location);
  const initialCategories = useSelector((state) =>
    state.categories.categories.map((category) => category.id)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategories
  );
  const myPosts = useSelector((state) => state.posts.myPosts);
  const [showPosts, setShowPosts] = useState(myPosts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadMyPosts = useCallback(async () => {
    try {
      await dispatch(fetchMyPosts(currentLocation));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, currentLocation]);

  useEffect(() => {
    loadMyPosts();
  }, [loadMyPosts, isFocused]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadMyPosts();
    setIsRefreshing(false);
  };

  useEffect(() => {
    setShowPosts(
      myPosts.filter((post) => selectedCategories.includes(post.categoryId))
    );
  }, [selectedCategories, myPosts]);

  const header = (
    <View>
      <View style={{ marginTop: 25 }}>
        <CategoryList
          inputMode
          many
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
      </View>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>Your Available Post</MyText>
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
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    fontFamily: "kanit",
    fontSize: 19,
  },
});

export const screenOptions = {
  headerShown: false,
};

export default MyPostsScreen;
