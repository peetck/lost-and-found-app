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

import MyTextInput from "../../components/UI/MyTextInput";
import MyButton from "../../components/UI/MyButton";
import AuthHeader from "../../components/auth/AuthHeader";
import { takeImage, takeImageActionSheetOptions } from "../../shared/utils";
import { signUp } from "../../store/actions/user";

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
      await dispatch(
        signUp(email, password, props.route.params.nickname, selectedImage)
      );
    } catch (error) {
      // TODO: handler error
      setIsLoading(false);
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
            subtitle={props.route.params.nickname}
          />

          <View style={styles.imageInputContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
              <Image
                style={styles.image}
                source={
                  selectedImage
                    ? {
                        uri: selectedImage,
                      }
                    : require("../../assets/images/user_default.png")
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            <MyTextInput
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <MyTextInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <MyButton
              title="Sign up"
              onPress={signUpHandler}
              loading={isLoading}
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
