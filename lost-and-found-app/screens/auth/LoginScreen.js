import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
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
import { login } from "../../store/actions/user";
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

  const passwordRef = useRef(null);

  const { showActionSheetWithOptions } = useActionSheet();

  const changeLanguageHandler = () => {
    showActionSheetWithOptions(changeLanguageActionSheetOptions, (index) => {
      if (index !== 2) {
        changeLanguage(index);
      }
    });
  };

  const loginHandler = async () => {
    setIsLoading(true);

    try {
      if (email.trim().length === 0 || password.length < 6) {
        throw new Error(i18n.t("loginScreen.emailAndPasswordError"));
      }
      await dispatch(login(email.trim(), password));
      showSuccess(
        i18n.t("loginScreen.loginSuccess"),
        i18n.t("loginScreen.successMsg")
      );
    } catch (error) {
      showError(error.message);
      setIsLoading(false);
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
        <Ionicons
          size={23}
          name={Platform.OS === "android" ? "md-globe" : "ios-globe"}
        />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          style={styles.contentContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
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
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
            />
            <MyTextInput
              placeholder={i18n.t("loginScreen.placeHolderPass")}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              ref={passwordRef}
            />
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.normalLoginButton}>
              <MyButton
                title={i18n.t("loginScreen.subtitle")}
                onPress={loginHandler}
              />
            </View>
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
        </KeyboardAvoidingView>
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
