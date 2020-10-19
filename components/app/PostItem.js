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

      <View style={styles.cardInfo}>
        <MyText style={styles.title}>{props.title}</MyText>
        <View
          style={{ ...styles.colorContainer, backgroundColor: props.color }}
        />
      </View>

      <View style={styles.cardStatus}>
        <View style={styles.leftStatusContainer}>
          <Ionicons size={15} color="black" name="md-locate" />
          <MyText>1.5 m</MyText>
        </View>
        <View style={styles.rightStatusContainer}>
          <Ionicons size={15} color="black" name="md-time" />
          <MyText>45 min</MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    paddingLeft: 5,
    paddingRight: 15,
  },
  cardImage: {
    borderRadius: 10,
    width: 200,
    height: 150,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontFamily: "kanit-light",
    fontSize: 17,
    paddingVertical: 5,
  },
});

export default PostItem;
