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
import { CardStyleInterpolators } from "@react-navigation/stack";

import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import MyButton from "../../components/UI/MyButton";
import AuthHeader from "../../components/auth/AuthHeader";

const NextSignUpScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pickedImage, setPickedImage] = useState(
    "https://static.wixstatic.com/media/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.png/v1/fill/w_173,h_172,al_c,q_85,usm_0.66_1.00_0.01/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.webp"
  );

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
          <AuthHeader
            style={styles.headerContainer}
            title="Lost & Found"
            subtitle={props.route.params.nickName}
          />

          <View style={styles.imageInputContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
              <Image
                style={styles.image}
                source={{
                  uri: pickedImage,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textInputContainer}>
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
    backgroundColor: "white",
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
  imageInputContainer: {
    flex: 1,
    alignItems: "center",
  },
  textInputContainer: {
    flex: 1,
    paddingTop: 30,
  },
  buttonContainer: {
    flex: 1,
  },
  image: {
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

export const screenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerTitle: "",
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
  },
};

export default NextSignUpScreen;
