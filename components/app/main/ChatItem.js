import React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";

import MyText from "../../UI/MyText";

const ChatItem = (props) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <Image
        source={{
          uri: props.imageUrl,
        }}
        style={styles.userImage}
      />
      <View style={styles.userDetail}>
        <MyText style={styles.title}>{props.title}</MyText>
        <MyText style={styles.subtitle}>{props.subtitle}</MyText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 15,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userDetail: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default ChatItem;
