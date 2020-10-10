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

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUpHandler = () => {
    props.navigation.navigate("NextSignUp");
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
          <View style={styles.centerContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/logo.png")}
            />
            <MyText style={styles.title}>Lost & Found</MyText>
            <MyText style={styles.subtitle}>Sign up</MyText>
          </View>
          <View>
            <MyTextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <MyTextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <MyTextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
            <MyButton title="Next" onPress={signUpHandler} />
          </View>

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
    justifyContent: "space-around",
    paddingHorizontal: 35,
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 35,
    fontFamily: "kanit-bold",
  },
  subtitle: {
    fontSize: 35,
  },
  switchToLoginText: {
    fontFamily: "kanit-bold",
    color: Colors.grey,
    fontSize: 20,
  },
});

export default SignUpScreen;
