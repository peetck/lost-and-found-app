import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
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
import HeaderButton from "../../components/UI/HeaderButton";

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

  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-globe"
          color="black"
          onPress={changeLanguageHandler}
        />
      </HeaderButtons>
    ),
  });

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
    paddingHorizontal: 35,
    backgroundColor: "white",
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
  headerTitle: "",
  headerStyle: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(SignUpScreen);
