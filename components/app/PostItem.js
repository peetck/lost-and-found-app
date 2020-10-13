import React from "react";
import { View, StyleSheet, Image } from "react-native";

import MyText from "../UI/MyText";

const PostItem = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftCard}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://avatars3.githubusercontent.com/u/42176460?s=460&u=a89227411976b95a58a603d26d0aa69b7b233d18&v=4",
          }}
        />
      </View>
      <View style={styles.rightCard}>
        <View style={styles.cardInfo}>
          <MyText style={styles.title}>{props.title}</MyText>
          <MyText style={styles.subtext}>
            Lorem Ipsum is simply dummy text of ....
          </MyText>
          <MyText style={styles.subtext}>
            Dallas Home Buyers - Cash Home Buyer...
          </MyText>
        </View>

        <View style={styles.bottomBar}>
          <MyText>picnic</MyText>
          <MyText>15.3m</MyText>
          <MyText>30m left</MyText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 170,
    flexDirection: "row",
    borderRadius: 5,
  },
  leftCard: {
    flex: 0.7,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightCard: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "orange",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "kanit-bold",
    color: "white",
    fontSize: 25,
  },
  subtext: {
    color: "white",
  },
});

export default PostItem;
