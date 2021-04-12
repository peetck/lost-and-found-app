import React from "react";
import { TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MyText from "../../UI/MyText";

const ChatItem = (props) => {
  const uid = useSelector((state) => state.user.uid);

  const owner = props?.subtitle?.fromUid === uid;

  const subtitle = props?.subtitle?.message
    ? props.subtitle.message
    : "You are now connected";

  const time = () => {
    if (props?.subtitle?.on) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const currentDate = new Date();
      const date = new Date(props.subtitle.on);
      if (date.getFullYear() !== currentDate.getFullYear()) {
        return `${
          monthNames[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
      }
      if (
        date.getMonth() === currentDate.getMonth() &&
        date.getDate() === currentDate.getDate()
      ) {
        // same day
        return `${
          date.getHours() > 9 ? "" + date.getHours() : "0" + date.getHours()
        }:${
          date.getMinutes() > 9
            ? "" + date.getMinutes()
            : "0" + date.getMinutes()
        }`;
      }

      return `${monthNames[date.getMonth()]} ${date.getDate()}`;
    }
    return "";
  };

  const isSeen = owner || props.seen;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={props.onPress}
    >
      <Image
        source={{
          uri: props.imageUrl,
        }}
        style={styles.userImage}
      />
      <View style={styles.userDetail}>
        <MyText
          style={
            isSeen
              ? styles.title
              : { ...styles.title, fontFamily: "kanit-bold" }
          }
        >
          {props.title}
        </MyText>
        <MyText
          style={
            isSeen
              ? styles.subtitle
              : { ...styles.subtitle, fontFamily: "kanit-bold" }
          }
          numberOfLines={1}
        >
          {`${owner ? "You: " : ""}${subtitle} • ${time()}`}
        </MyText>
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
