import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import Constants from "expo-constants";
import i18n from "i18n-js";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import colors from "../../shared/colors";
import AuthHeader from "../../components/auth/AuthHeader";
import {
  showError,
  changeLanguageActionSheetOptions,
  changeLanguage,
} from "../../shared/utils";

const SignUpScreen = (props) => {
  const [nickname, setNickname] = useState("");

  const { showActionSheetWithOptions } = useActionSheet();

  const changeLanguageHandler = () => {
    showActionSheetWithOptions(changeLanguageActionSheetOptions, (index) => {
      if (index !== 2) {
        changeLanguage(index);
      }
    });
  };

  const signUpHandler = () => {
    if (nickname.trim() === "") {
      showError("Error", "Please enter your nickname.");
    } else {
      props.navigation.navigate("NextSignUp", {
        nickname: nickname.trim(),
      });
    }
  };

  const switchToLoginHandler = () => {
    props.navigation.replace("Login");
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.languageChangeContainer}
        onPress={changeLanguageHandler}
      >
        <Ionicons size={23} name="md-globe" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <AuthHeader
            style={styles.centerContainer}
            title="Lost & Found"
            subtitle={i18n.t("signUpScreen.subtitle")}
            image={require("../../assets/images/logo.png")}
          />

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder={i18n.t("signUpScreen.placeHolderNickname")}
              onChangeText={setNickname}
              value={nickname}
            />
          </View>

          <MyButton
            title={i18n.t("signUpScreen.nextButton")}
            onPress={signUpHandler}
          />

          <View style={styles.centerContainer}>
            <MyText>{i18n.t("signUpScreen.hint")}</MyText>

            <TouchableOpacity
              onPress={switchToLoginHandler}
              activeOpacity={0.6}
            >
              <MyText style={styles.switchToLoginText}>
                {i18n.t("signUpScreen.login")}
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 35,
    backgroundColor: "white",
  },
  languageChangeContainer: {
    position: "absolute",
    right: 20,
    top: Constants.statusBarHeight + 15,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  switchToLoginText: {
    fontFamily: "kanit-bold",
    color: colors.grey,
    fontSize: 20,
  },
});

export const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(SignUpScreen);
