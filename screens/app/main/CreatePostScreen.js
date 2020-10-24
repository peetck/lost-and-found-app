import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePostScreen = (props) => {
  return (
    <View>
      <Text>Create post screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = {
  headerTitle: "Create Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default CreatePostScreen;
