import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import MyText from "../../UI/MyText";
import { getCurrentLanguage } from "../../../shared/utils";

const CategoryList = (props) => {
  const categories = useSelector((state) => state.categories.categories);
  const language = getCurrentLanguage();

  const { inputMode, many, onChange, selectedMode, categoryId } = props;
  let { value } = props;

  const buildCategory = (id, title, color) => {
    if (inputMode) {
      return (
        <TouchableOpacity
          key={title}
          style={styles.categoryContainer}
          activeOpacity={0.6}
          onPress={() => {
            if (many) {
              if (value.includes(id)) {
                value = value.filter((eachId) => eachId !== id);
              } else {
                value = value.concat(id);
              }
              onChange(value);
            } else {
              onChange(id);
            }
          }}
        >
          <View style={{ ...styles.rectangle, backgroundColor: color }}>
            {(many ? value.includes(id) : value === id) && (
              <Ionicons
                name={
                  Platform.OS === "android"
                    ? "md-checkmark-circle"
                    : "ios-checkmark-circle"
                }
                size={23}
                color="white"
              />
            )}
          </View>
          <MyText style={styles.text}>{title}</MyText>
        </TouchableOpacity>
      );
    } else if (selectedMode) {
      return (
        <View style={styles.categoryContainer} key={title}>
          <View style={{ ...styles.rectangle, backgroundColor: color }}>
            {id === categoryId && (
              <Ionicons
                name={
                  Platform.OS === "android"
                    ? "md-checkmark-circle"
                    : "ios-checkmark-circle"
                }
                size={23}
                color="white"
              />
            )}
          </View>
          <MyText style={styles.text}>{title}</MyText>
        </View>
      );
    }
  };

  const topContent = categories
    .slice(0, 3)
    .map((item) => buildCategory(item.id, item.title[language], item.color));

  const bottomContent = categories
    .slice(3)
    .map((item) => buildCategory(item.id, item.title[language], item.color));

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
