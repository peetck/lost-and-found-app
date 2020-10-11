import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";

import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import MyButton from "../../components/UI/MyButton";

const NextSignUpScreen = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setPickedImage(image.uri);
    }
  };

  const signUpHandler = async () => {
    const email = props.route.params.email;
    const password = props.route.params.password;

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const response = await fetch(pickedImage);
      const blob = await response.blob();

      const ref = firebase
        .storage()
        .ref()
        .child("user_image")
        .child(user.uid + ".jpg");

      ref.put(blob);
    } catch (error) {
      // TODO: handler error
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <MyText style={styles.title}>Lost & Found</MyText>
            <MyText style={styles.subtitle}>Sign up</MyText>
          </View>

          <View style={styles.inputImageContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
              <Image
                style={styles.image}
                source={{
                  uri: pickedImage,
                }}
              />
            </TouchableOpacity>
            <View style={styles.textInputContainer}>
              <MyTextInput placeholder="Nickname" style={styles.textInput} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <MyButton title="Sign up" onPress={signUpHandler} />
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
  },
  scrollView: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  inputImageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textInputContainer: {
    paddingTop: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "kanit-bold",
  },
  subtitle: {
    fontSize: 35,
  },
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
  textInput: {
    textAlign: "center",
  },
});

export default NextSignUpScreen;
