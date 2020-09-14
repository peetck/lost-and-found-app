import React from "react";
import { Text, View, StyleSheet } from "react-native";

const EditPostScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Edit Post Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditPostScreen;
