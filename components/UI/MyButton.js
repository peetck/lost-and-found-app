import React from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import MyText from "./MyText";
import Colors from "../../constants/Colors";

const MyButton = (props) => {
  if (props.loading) {
    return (
      <View style={styles.button}>
        <ActivityIndicator size={25} color="white" />
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <MyText style={styles.title}>{props.title}</MyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 25,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontFamily: "kanit-bold",
  },
});

export default MyButton;
