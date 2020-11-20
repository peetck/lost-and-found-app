import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";

import MyTextInput from "../../components/UI/MyTextInput";
import MyButton from "../../components/UI/MyButton";
import AuthHeader from "../../components/auth/AuthHeader";
import {
  takeImage,
  takeImageActionSheetOptions,
  showSuccess,
  showError,
} from "../../shared/utils";
import { signUp } from "../../store/actions/user";
import Loader from "../../components/UI/Loader";

const NextSignUpScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const takeImageHandler = () => {
    showActionSheetWithOptions(takeImageActionSheetOptions, async (index) => {
      if (index !== 2) {
        const imageUri = await takeImage(index);
        setSelectedImage(imageUri);
      }
    });
  };

  const signUpHandler = async () => {
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        throw new Error("Password doesn't match.");
      }
      await dispatch(
        signUp(
          email.trim(),
          password,
          props.route.params.nickname,
          selectedImage
        )
      );
      showSuccess("Registered successfully", "Welcome to Lost & Found App.");
    } catch (error) {
      showError("Error", error.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Loader visible={isLoading} />

          <AuthHeader
            style={styles.headerContainer}
            title="Lost & Found"
            subtitle={props.route.params.nickname}
          />

          <View style={styles.imageInputContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
              {selectedImage ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: selectedImage,
                  }}
                />
              ) : (
                <View
                  style={{
                    ...styles.image,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons size={60} color="black" name="md-camera" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder={i18n.t("nextSignUpScreen.placeHolderEmail")}
              onChangeText={setEmail}
              value={email}
            />
            <MyTextInput
              placeholder={i18n.t("nextSignUpScreen.placeHolderPass")}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <MyTextInput
              placeholder={i18n.t("nextSignUpScreen.placeHolderConfirmPass")}
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <MyButton
              title={i18n.t("nextSignUpScreen.signUp")}
              onPress={signUpHandler}
            />
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

export default connectActionSheet(NextSignUpScreen);
