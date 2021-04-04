import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

import colors from "../../../shared/colors";
import MyTextInput from "../../../components/UI/MyTextInput";

const Bubble = (props) => {
  return (
    <View
      style={
        props.right ? { alignItems: "flex-end" } : { alignItems: "flex-start" }
      }
    >
      <View style={styles.bubble}>
        <Text style={styles.bubbleText}>{props.message}</Text>
      </View>
    </View>
  );
};

const ChatScreen = (props) => {
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    console.log(message);
    setMessage("");
  };

  return (
    <View style={styles.screen}>
      <View>
        <Bubble message="Hello" right />
        <Bubble message="Hi" />
        <Bubble message="Welcome :)" right />
      </View>

      <MyTextInput
        onChangeText={setMessage}
        value={message}
        onSubmitEditing={sendMessageHandler}
        placeholder="Enter some message"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "white",
  },

  bubble: {
    backgroundColor: colors.primary,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 0,
    borderRadius: 50,
  },
  bubbleText: {
    color: "white",
  },
});

export const screenOptions = {
  headerTitle: "TEST",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default ChatScreen;
