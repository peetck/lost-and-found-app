import React from "react";
import { View, StyleSheet } from "react-native";

import MyText from "../UI/MyText";
import { CATEGORIES } from "../../constants/Categories";

const CategoryList = (props) => {
  const buildCategory = (title, color) => {
    return (
      <View style={styles.categoryContainer} key={title}>
        <View style={{ ...styles.circle, backgroundColor: color }} />
        <MyText style={styles.text}>{title}</MyText>
      </View>
    );
  };

  const topContent = CATEGORIES.slice(0, 3).map((item) =>
    buildCategory(item.title, item.color)
  );

  const bottomContent = CATEGORIES.slice(3).map((item) =>
    buildCategory(item.title, item.color)
  );

  return (
    <View>
      <View style={styles.topContainer}>{topContent}</View>

      <View style={styles.bottomContainer}>{bottomContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
  },
  categoryContainer: {
    flex: 1,
    alignItems: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
  },
});

export default CategoryList;
