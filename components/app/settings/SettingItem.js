import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Button } from "react-native";

import MyText from "../../../components/UI/MyText";

const SettingItem = (props) => {
  let defaultColor = "black"; // set default color

  /* Function render type of Content */
  const typeContainer = () => {
    // type is text
    if (props.type != "single") {
      return <MyText style={styles.contentText}>{props.text}</MyText>;
    }
  };

  /* Check Color */
  if (props.color != "default") {
    defaultColor = props.color;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contentBox}
        onPress={props.onPress}
        activeOpacity={0.6}
      >
        <View style={styles.containerText}>
          <MyText
            style={{
              color: defaultColor,
              paddingTop: 4,
              fontSize: 16,
              fontFamily: "kanit",
            }}
          >
            {props.title}
          </MyText>
          {typeContainer()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 2,
  },
  containerText: {
    flex: 1,
    padding: 10,
  },
  containerButtonText: {
    flexDirection: "row",
  },
  contentBox: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
  },
  contentIcon: {
    padding: 8,
  },
  contentText: {
    fontSize: 14,
    marginTop: 1,
    color: "black",
  },
});

export default SettingItem;
