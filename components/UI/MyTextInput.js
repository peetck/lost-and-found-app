import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import colors from "../../shared/colors";

const MyTextInput = (props) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput {...props} style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    paddingBottom: 25,
  },
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
    fontSize: 15,
    fontFamily: "kanit-light",
  },
});

export default MyTextInput;
