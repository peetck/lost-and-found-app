import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

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
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <MyText style={styles.titleText}>Lost & Found</MyText>
        <MyText style={styles.descriptionText}>
          {isLogin ? " Sign in to your account" : " Create account"}
        </MyText>
      </View>
      <View style={styles.inputContainer}>
        <MyText style={styles.inputLabel}>Email</MyText>
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          value={email}
          onChangeText={emailInputHandler}
        />
        <MyText style={styles.inputLabel}>Password</MyText>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          value={password}
          onChangeText={passwordInputHandler}
        />
        <View style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Button
              title={isLogin ? "Login" : "Signup"}
              onPress={AuthButtonHandler}
            />
          )}
        </View>
        <TouchableOpacity onPress={switchAuthHandler}>
          <MyText style={styles.signupText}>
            {isLogin
              ? "Don't have an account? Signup"
              : "Already have an account? Login"}
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingVertical: 60,
    height: "50%",
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  inputContainer: {
    height: "50%",
    margin: 30,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 5,
  },
  button: {
    marginVertical: 20,
  },
  titleText: {
    color: "white",
    fontSize: 40,
  },
  descriptionText: {
    color: "white",
    fontSize: 20,
  },
  signupText: {
    marginTop: 10,
    textAlign: "center",
  },
  textInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#EEEEFA",
    marginBottom: 15,
  },
});

export default AuthScreen;
