import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../../../components/app/main/PostList";
import { fetchMyPosts } from "../../../store/actions/posts";

const MyPostScreen = (props) => {
  const dispatch = useDispatch();
  const myPosts = useSelector((state) => state.posts.myPosts);

  const loadPosts = useCallback(async () => {
    // setIsLoading(true);
    await dispatch(fetchMyPosts());
    // setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <View style={styles.screen}>
      <Text>MyPost SCREEN</Text>

      <View style={{ flex: 0.5 }}>
        <PostList data={myPosts} navigation={props.navigation} />
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
});

export const screenOptions = {
  headerTitle: "My Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default MyPostScreen;
