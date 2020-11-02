import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../../UI/MyText";

const PostItem = (props) => {
  const categories = useSelector((state) => state.categories.categories);

  const bgColor = categories.find(
    (category) => category.id === props.categoryId
  ).color;

  /* TODO */
  const dateDiff = props.expirationDate.getTime() - new Date();
  const totalMinutes = Math.floor(dateDiff / 1000 / 60);

  const day = Math.floor(totalMinutes / 60 / 24);
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;

  const countdownText = `${day !== 0 ? day + "d" : ""} ${
    day === 0 ? hours + "h" : ""
  } ${hours === 0 ? minutes + "m" : ""}`;

  /* TODO */

  const meterText =
    props.distance || props.distance === 0
      ? `${Math.floor(props.distance * 1000)}m`
      : "";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.6}
      onPress={props.onPress}
    >
      <Image
        style={styles.cardImage}
        source={{
          uri: props.imageUrl,
        }}
      />

      <View style={{ ...styles.cardInfo, backgroundColor: bgColor }}>
        <MyText style={styles.title}>{props.title}</MyText>

        <View style={styles.cardStatus}>
          <View style={styles.leftStatusContainer}>
            {(props.distance || props.distance === 0) && (
              <Ionicons size={15} color="white" name="md-locate" />
            )}

            <MyText style={styles.statusText}>{meterText}</MyText>
          </View>
          <View style={styles.rightStatusContainer}>
            <Ionicons size={15} color="white" name="md-time" />
            <MyText style={styles.statusText}>{countdownText}</MyText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  cardImage: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 150,
  },
  cardInfo: {
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  colorContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  cardStatus: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  leftStatusContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  rightStatusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "kanit-light",
    fontSize: 17,
    paddingVertical: 5,
  },
  statusText: {
    color: "white",
  },
});

export default PostItem;
