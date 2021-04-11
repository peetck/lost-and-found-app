import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "./MyText";
import Colors from "../../shared/colors";

const MyButton = (props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...props.style }}
      onPress={props.onPress}
      activeOpacity={0.6}
    >
      <MyText style={styles.title}>
        {props.withIcon && (
          <>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-chatbubbles" : "ios-chatbubbles"
              }
              size={23}
              color="white"
            />
            {"  "}
          </>
        )}
        {props.title}
      </MyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "kanit-bold",
  },
});

export default MyButton;
