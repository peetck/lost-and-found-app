import React from "react";
import { View, StyleSheet, Image } from "react-native";

import colors from "../../../shared/colors";
import MyText from "../../../components/UI/MyText";

const UserInformation = (props) => {
  const { nickname, email, imageUrl } = props;

  return (
    <View style={styles.userContainer}>
      <Image
        style={styles.userImage}
        source={
          imageUrl
            ? {
                uri: imageUrl,
              }
            : null
        }
      />
      <View style={styles.userInfoContainer}>
        <MyText style={styles.nickname} numberOfLines={1}>
          {nickname}
        </MyText>
        <MyText style={styles.email}>{email}</MyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    marginTop: 25,
    paddingHorizontal: 15,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  userInfoContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingLeft: 25,
  },
  nickname: {
    fontSize: 25,
    fontFamily: "kanit",
  },
  email: {
    color: colors.grey,
  },
});

export default UserInformation;
