import React, { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../../../components/app/main/PostList";
import { fetchMyPosts } from "../../../store/actions/posts";
import MyText from "../../../components/UI/MyText";
import CategoryList from "../../../components/app/main/CategoryList";

const MyPostsScreen = (props) => {
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

  const header = (
    <View>
      <View style={{ marginTop: 25 }}>
        <CategoryList />
      </View>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>Your Post</MyText>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <PostList data={myPosts} navigation={props.navigation} header={header} />
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
