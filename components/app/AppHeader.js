import React from "react";
import { View, StyleSheet, Image } from "react-native";

import MyText from "../UI/MyText";

const AppHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />
      <View style={styles.titleContainer}>
        <MyText style={styles.title}>{props.title}</MyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 35,
    fontFamily: "kanit-bold",
  },
});

export default AppHeader;
