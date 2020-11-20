import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
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
import { login, loginWithFacebook } from "../../store/actions/user";
import {
  showSuccess,
  showError,
  changeLanguageActionSheetOptions,
  changeLanguage,
} from "../../shared/utils";
import Loader from "../../components/UI/Loader";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const changeLanguageHandler = () => {
    showActionSheetWithOptions(changeLanguageActionSheetOptions, (index) => {
      if (index !== 2) {
        changeLanguage(index);
      }
    });
  };

  const loginHandler = async (method) => {
    setIsLoading(true);
    if (method === "email") {
      try {
        await dispatch(login(email.trim(), password));
        showSuccess(
          i18n.t("loginScreen.loginSuccess"),
          i18n.t("loginScreen.successMsg")
        );
      } catch (error) {
        showError(error.message);
        setIsLoading(false);
      }
    } else if (method === "facebook") {
      try {
        await dispatch(loginWithFacebook());
        showSuccess(
          i18n.t("loginScreen.loginSuccess"),
          i18n.t("loginScreen.loginSuccess")
        );
      } catch (error) {
        setIsLoading(false);
        if (error.message !== "") {
          showError(error.message);
        }
      }
    }
  };

  const switchToSignUpHandler = () => {
    props.navigation.replace("SignUp");
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
          <Loader visible={isLoading} />

          <AuthHeader
            style={styles.centerContainer}
            title="Lost & Found"
            subtitle={i18n.t("loginScreen.subtitle")}
            image={require("../../assets/images/logo.png")}
          />

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder={i18n.t("loginScreen.placeHolderEmail")}
              onChangeText={setEmail}
              value={email}
            />
            <MyTextInput
              placeholder={i18n.t("loginScreen.placeHolderPass")}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.normalLoginButton}>
              <MyButton
                title={i18n.t("loginScreen.subtitle")}
                onPress={() => loginHandler("email")}
              />
            </View>

            <TouchableOpacity
              style={styles.facebookLoginButton}
              activeOpacity={0.6}
              onPress={() => loginHandler("facebook")}
            >
              <Ionicons name="logo-facebook" size={45} color="#4267B2" />
            </TouchableOpacity>
          </View>

          <View style={styles.centerContainer}>
            <MyText>{i18n.t("loginScreen.hint")}</MyText>
            <TouchableOpacity
              onPress={switchToSignUpHandler}
              activeOpacity={0.6}
            >
              <MyText style={styles.switchToSignUpText}>
                {i18n.t("loginScreen.signUp")}
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  languageChangeContainer: {
    position: "absolute",
    right: 20,
    top: Constants.statusBarHeight + 15,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  normalLoginButton: {
    flex: 1,
  },
  facebookLoginButton: {
    flex: 0.4,
    marginLeft: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
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
  switchToSignUpText: {
    fontFamily: "kanit-bold",
    color: colors.grey,
    fontSize: 20,
  },
});

export const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(LoginScreen);
