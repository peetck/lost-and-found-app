import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import colors from "../../shared/colors";
import AuthHeader from "../../components/auth/AuthHeader";
import { showError } from "../../shared/utils";

const en = {
  subtitle: "Sign up",
  placeHolderNickname: "Nickname",
  nextButton: "Next",
  hint: "Already have an account ?",
  Login: "Login",
 };
 
 const th = {
   subtitle: "สมัครสมาชิก",
   placeHolderNickname: "ชื่อเล่น",
   nextButton: "ถัดไป",
   hint: "มีบัญชีอยู่แล้ว ?",
   Login: "เข้าสู่ระบบ"
 };
 

const SignUpScreen = (props) => {
  const [nickname, setNickname] = useState("");

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
            subtitle="Sign up"
            image={require("../../assets/images/logo.png")}
          />

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder="Nickname"
              onChangeText={setNickname}
              value={nickname}
            />
          </View>

          <MyButton title="Next" onPress={signUpHandler} />

          <View style={styles.centerContainer}>
            <MyText>Already have an account ?</MyText>
            <TouchableOpacity
              onPress={switchToLoginHandler}
              activeOpacity={0.6}
            >
              <MyText style={styles.switchToLoginText}>Login</MyText>
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

export default SignUpScreen;
