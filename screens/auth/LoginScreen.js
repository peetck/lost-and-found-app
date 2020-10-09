import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import firebase from "firebase";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import Colors from "../../constants/Colors";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      // TODO: handler error
      console.log(error);
      setIsLoading(false);
    }
  };

  const switchToSignUpHandler = () => {
    props.navigation.replace("SignUp");
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
            <MyText style={styles.subtitle}>Login</MyText>
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
            <View style={styles.buttonContainer}>
              <MyButton
                title="Login"
                onPress={loginHandler}
                loading={isLoading}
              />
            </View>
          </View>

          <View style={styles.centerContainer}>
            <MyText>Doesn't have an account ?</MyText>
            <TouchableOpacity onPress={switchToSignUpHandler}>
              <MyText style={styles.switchToSignUpText}>Sign up</MyText>
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
  switchToSignUpText: {
    fontFamily: "kanit-bold",
    color: Colors.grey,
    fontSize: 20,
  },
  buttonContainer: {
    paddingTop: 30,
  },
});

export default LoginScreen;
