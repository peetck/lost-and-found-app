import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingList = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      activeOpacity={0.6}
    >
      <Ionicons name={props.iconName} size={24} color="black" />
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  label: {
    fontSize: 15,
    paddingLeft: 15
  },
});

export default SettingList;
