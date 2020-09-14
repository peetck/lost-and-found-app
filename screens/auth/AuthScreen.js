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
      {/* <KeyboardAvoidingView
        behavior={null}
        // behavior={Platform.OS === "ios" ? "padding" : null}
      > */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{
              uri:
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Oikya_Front_Logo.png",
            }}
          />
          <MyText style={styles.logoText}>Lost and Found</MyText>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <MyText style={styles.authText}>{isLogin ? "LOGIN" : "SIGNUP"}</MyText>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          placeholderTextColor="white"
          onChangeText={emailInputHandler}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          placeholderTextColor="white"
          onChangeText={passwordInputHandler}
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.button}>
              <TouchableOpacity onPress={AuthButtonHandler}>
                <MyText style={styles.buttonText}>
                  {isLogin ? "Login" : "Signup"}
                </MyText>
              </TouchableOpacity>
            </View>
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
      {/* </KeyboardAvoidingView> */}
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
    marginTop: 20,
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    color: "white",
  },
  logo: {
    width: 120,
    height: 120,
  },
  authText: {
    fontSize: 35,
    color: "white",
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    marginBottom: 20,
    color: "white",
    borderBottomColor: "white",
    width: "90%",
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
