import React, { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PostList from "../../../components/app/main/PostList";
import { fetchMyPosts } from "../../../store/actions/posts";
import MyText from "../../../components/UI/MyText";
import CategoryList from "../../../components/app/main/CategoryList";
import HeaderButton from "../../../components/UI/HeaderButton";

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

export const screenOptions = (navData) => {
  return {
    headerTitle: "My Post",
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

export default MyPostScreen;
