import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import MyText from "../UI/MyText";

const MyTextInput = (props) => {
  const [error, setError] = useState();

  const isEmailAddress = (text) => {
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(text);
  };

  const validate = (text) => {
    if (props.email && !isEmailAddress(text)) {
    }
  };

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        {...props}
        style={
          error
            ? { ...styles.textInput, borderBottomColor: "red" }
            : styles.textInput
        }
        onC
      />
      {error && <MyText style={styles.errorText}>{error}</MyText>}
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
  errorText: {
    position: "absolute",
    color: "red",
    top: "100%",
    fontSize: 13,
  },
});

export default MyTextInput;
