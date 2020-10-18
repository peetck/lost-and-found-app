import React from "react";
import { View, Image, StyleSheet } from "react-native";

import MyText from "../UI/MyText";

const Header = (props) => {
  return (
    <View style={props.style}>
      {props.image && <Image style={styles.image} source={props.image} />}
      <MyText style={styles.title}>{props.title}</MyText>
      <MyText style={styles.subtitle}>{props.subtitle}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 35,
    fontFamily: "kanit-bold",
  },
  subtitle: {
    fontSize: 30,
  },
});

export default Header;
