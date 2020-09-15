import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatOverviewScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>Chat Overview Screen</Text>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Chat",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatOverviewScreen;
