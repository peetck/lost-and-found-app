import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import i18n from "i18n-js";

import { changeNickname } from "../../../store/actions/user";
import MyTextInput from "../../../components/UI/MyTextInput";
import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";
import Loader from "../../../components/UI/Loader";
import { showError } from "../../../shared/utils";

const ChangeNicknameScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [text, setText] = useState(user.nickname);
  const [isLoading, setIsLoading] = useState(false);

  const changeNicknameHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(changeNickname(text));
    } catch (error) {
      showError(error.message);
    }
    setIsLoading(false);
    props.navigation.navigate("AccountSetting");
  };

  return (
    <View style={styles.screen}>
      <Loader visible={isLoading} />
      <MyTextInput onChangeText={setText} value={text} />
      <TouchableOpacity
        style={{
          marginTop: 12,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
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
