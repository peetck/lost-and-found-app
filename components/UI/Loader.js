import React from "react";
import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const Loader = (props) => {
  const { visible, alpha } = props;

  return (
    <AnimatedLoader
      visible={visible}
      overlayColor={`rgba(255,255,255,${alpha ? alpha : 0.75})`}
      source={require("../../assets/loader.json")}
      animationStyle={styles.animationStyle}
      speed={1}
    />
  );
};

const styles = StyleSheet.create({
  animationStyle: {
    width: 250,
    height: 250,
  },
});

export default Loader;
