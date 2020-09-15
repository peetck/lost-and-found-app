import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MyText from "../../components/UI/MyText";
import Colors from "../../constants/Colors";
import firebase from "firebase";

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputHandler = (text) => {
    setEmail(text);
  };

  const passwordInputHandler = (text) => {
    setPassword(text);
  };

  const AuthButtonHandler = async () => {
    setIsLoading(true);
    try {
      if (isLogin) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      // TODO: handler error
      console.log(error);
      setIsLoading(false);
    }
  };

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
          <MyText style={styles.logoText}>Lost and Found</MyText>
          <MyText style={styles.authText}>
            {isLogin ? "LOGIN" : "SIGNUP"}
          </MyText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          placeholderTextColor="white"
          onChangeText={emailInputHandler}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => {
            passwordInput.focus();
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          placeholderTextColor="white"
          onChangeText={passwordInputHandler}
          returnKeyType="done"
          ref={(input) => {
            passwordInput = input;
          }}
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <TouchableOpacity onPress={AuthButtonHandler} activeOpacity={0.7}>
              <View style={styles.button}>
                <MyText style={styles.buttonText}>
                  {isLogin ? "Login" : "Signup"}
                </MyText>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={switchAuthHandler}>
          <MyText style={styles.switchAuthText}>
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </MyText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  headerContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    margin: 30,
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    margin: 20,
    alignItems: "center",
  },
  logoText: {
    fontSize: 35,
    color: "white",
    fontFamily: "kanit-bold",
  },
  logo: {
    width: 180,
    height: 180,
  },
  authText: {
    fontSize: 35,
    color: "white",
    fontFamily: "kanit",
  },
  textInput: {
    borderBottomWidth: 1,
    marginBottom: 30,
    color: "white",
    borderBottomColor: "white",
    width: "90%",
    fontSize: 17,
  },
  switchAuthText: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    width: 150,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 20,
  },
});

export default AuthScreen;
