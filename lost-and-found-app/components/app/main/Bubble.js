import React from "react";
import { View, Image, StyleSheet } from "react-native";

import MyText from "../../UI/MyText";
import colors from "../../../shared/colors";

const Bubble = ({ message, right, imageUrl }) => {
  return (
    <View
      style={right ? { alignItems: "flex-end" } : { alignItems: "flex-start" }}
    >
      <View style={styles.container}>
        {!right && (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.image}
          />
        )}
        <View style={styles.bubble}>
          <MyText style={styles.bubbleText}>{message}</MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    backgroundColor: colors.primary,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 0,
    borderRadius: 10,
    maxWidth: "50%"
  },
  bubbleText: {
    color: "white",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
});

export default Bubble;
