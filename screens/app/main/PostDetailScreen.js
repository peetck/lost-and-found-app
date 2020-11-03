import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const PostDetailScreen = (props) => {
  const posts = useSelector((state) => state.posts.posts);
  const myPosts = useSelector((state) => state.posts.myPosts);

  const postId = props.route.params.postId;
  const postsIndex = posts.findIndex((post) => post.id === postId);
  const myPostsIndex = myPosts.findIndex((post) => post.id === postId);

  const post = postsIndex >= 0 ? posts[postsIndex] : myPosts[myPostsIndex];

  const pressLocationHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: {
        lat: post.lat,
        long: post.long,
      },
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: post.imageUrl }} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{post.description}</Text>
      </View>

      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.6}
        onPress={pressLocationHandler}
      >
        <Image style={styles.image} source={{ uri: post.mapUrl }} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {},
});

export const screenOptions = (navData) => {
  const { title } = navData.route.params;
  return {
    headerTitle: title,
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
  };
};

export default PostDetailScreen;
