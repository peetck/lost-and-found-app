import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const MyTextInput = (props) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput {...props} style={{ ...styles.textInput, ...props.style }} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    paddingBottom: 25,
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
    fontSize: 15,
  },
});

export default MyTextInput;
