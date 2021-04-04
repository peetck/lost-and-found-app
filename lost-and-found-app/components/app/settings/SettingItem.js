import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";

const SettingItem = (props) => {
  return (
    <View style={styles.container}>
      {props.onPress ? (
        <TouchableOpacity
          style={styles.contentBox}
          onPress={props.onPress}
          activeOpacity={0.6}
        >
          <MyText style={styles.title}>{props.title}</MyText>
          <MyText style={styles.contentText} numberOfLines={1}>
            {props.text}
          </MyText>
        </TouchableOpacity>
      ) : (
        <View style={styles.contentBox}>
          <MyText style={styles.disableTitle}>{props.title}</MyText>
          <MyText style={styles.disableContentText}>{props.text}</MyText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentBox: {
    flex: 1,
    borderBottomWidth: 0.2,
    padding: 10,
  },
  contentText: {
    fontSize: 14,
    marginTop: 1,
    color: "black",
  },
  title: {
    color: "black",
    paddingTop: 4,
    fontSize: 16,
    fontFamily: "kanit",
  },
  disableTitle: {
    color: colors.grey,
    paddingTop: 4,
    fontSize: 16,
    fontFamily: "kanit",
  },
  disableContentText: {
    fontSize: 14,
    marginTop: 1,
    color: colors.grey,
  },
});

export default SettingItem;
