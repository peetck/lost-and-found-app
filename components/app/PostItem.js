import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MyText from "../UI/MyText";

const PostItem = (props) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri:
            "https://kujimag.com/wp-content/uploads/2019/06/sushi-top-five.jpg",
        }}
      />

      <View style={{ ...styles.cardInfo, backgroundColor: props.color }}>
        <MyText style={styles.title}>{props.title}</MyText>

        <View style={styles.cardStatus}>
          <View style={styles.leftStatusContainer}>
            <Ionicons size={15} color="white" name="md-locate" />
            <MyText style={styles.statusText}>1.5 m</MyText>
          </View>
          <View style={styles.rightStatusContainer}>
            <Ionicons size={15} color="white" name="md-time" />
            <MyText style={styles.statusText}>45 min</MyText>
          </View>
        </View>
      </View>
    </View>
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
