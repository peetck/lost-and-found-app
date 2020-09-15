import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PostDetailScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Post Detail Screen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Post Detail",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetailScreen;
