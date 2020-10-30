import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../UI/MyText";
import { CATEGORIES } from "../../../constants/Categories";

const CategoryList = (props) => {
  const buildCategory = (id, title, color) => {
    if (props.inputMode) {
      return (
        <TouchableOpacity
          key={title}
          style={styles.categoryContainer}
          activeOpacity={0.6}
          onPress={() => props.onChange(id)}
        >
          <View style={{ ...styles.rectangle, backgroundColor: color }}>
            {props.value === id && (
              <Ionicons name="md-checkmark-circle" size={23} color="white" />
            )}
          </View>
          <MyText style={styles.text}>{title}</MyText>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.categoryContainer} key={title}>
        <View style={{ ...styles.circle, backgroundColor: color }} />
        <MyText style={styles.text}>{title}</MyText>
      </View>
    );
  };

  const topContent = CATEGORIES.slice(0, 3).map((item) =>
    buildCategory(item.id, item.title, item.color)
  );

  const bottomContent = CATEGORIES.slice(3).map((item) =>
    buildCategory(item.id, item.title, item.color)
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
  rectangle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 60,
    height: 50,
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
