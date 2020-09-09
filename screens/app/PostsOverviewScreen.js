import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";

const PostsOverviewScreen = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>PostsOverviewScreen</Text>
      <Button
        title="dummy logout"
        onPress={() => {
          firebase.auth().signOut();
        }}
      />
    </View>
  );
};

export default PostsOverviewScreen;
