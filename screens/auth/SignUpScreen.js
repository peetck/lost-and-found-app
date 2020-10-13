import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import Colors from "../../constants/Colors";
import Header from "../../components/auth/Header";

const SignUpScreen = (props) => {
  const [nickName, setNickName] = useState("");

  const signUpHandler = () => {
    props.navigation.navigate("NextSignUp", {
      nickName: nickName,
    });
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
          <Header
            style={styles.centerContainer}
            title="Lost & Found"
            subtitle="Sign up"
            image={require("../../assets/images/logo.png")}
          />

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder="Nickname"
              onChangeText={(text) => setNickName(text)}
              value={nickName}
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
    color: Colors.grey,
    fontSize: 20,
  },
});

export default SignUpScreen;
