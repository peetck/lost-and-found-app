import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";

import { useSelector, useDispatch } from "react-redux";
import { changeNickname } from "../../../store/actions/user";
import i18n from "i18n-js";

const ChangeNicknameScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  {
    /* state */
  }
  const [text, setText] = useState(user.nickname);

  {
    /* function */
  }
  const renderLengthOfText = () => {
    return <Text style={styles.content}>{text.length}/100</Text>;
  };

  {
    /* return */
  }
  return (
    <View style={styles.screen}>
      {renderLengthOfText()}
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => {
          setText(text);
        }}
        value={text}
      />
      <View style={{ marginTop: 12 }}>
        <Button
          title="Save"
          color="#1b6ca8"
          onPress={async () => {
            await dispatch(changeNickname(text));
            props.navigation.navigate("ProfileSetting");
          }}
        ></Button>
      </View>
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
  textInput: {
    borderWidth: 0.5,
    borderRadius: 3,
    height: 38,
    fontSize: 18,
    paddingHorizontal: 7,
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
