import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import i18n from "i18n-js";

import { changeNickname } from "../../../store/actions/user";
import MyTextInput from "../../../components/UI/MyTextInput";
import MyText from "../../../components/UI/MyText";

const ChangeNicknameScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [text, setText] = useState(user.nickname);

  // const renderLengthOfText = () => {
  //   return <Text style={styles.content}>{text.length}/100</Text>;
  // };

  const changeNicknameHandler = async () => {
    await dispatch(changeNickname(text));
    props.navigation.navigate("AccountSetting");
  };

  return (
    <View style={styles.screen}>
      {/* {renderLengthOfText()} */}
      <MyTextInput onChangeText={setText} value={text} />
      <TouchableOpacity
        style={{
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1b6ca8",
          padding: 10,
          borderRadius: 10,
        }}
        activeOpacity={0.6}
        onPress={changeNicknameHandler}
      >
        <MyText
          style={{
            color: "white",
            fontFamily: "kanit",
            fontSize: 16,
          }}
        >
          {i18n.t("changeNicknameScreen.buttonText")}
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    fontSize: 12,
    marginBottom: 4,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});

export const screenOptions = {
  title: i18n.t("changeNicknameScreen.headerTitle"),
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default ChangeNicknameScreen;
