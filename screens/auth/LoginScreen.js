import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import i18n from "i18n-js";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import colors from "../../shared/colors";
import AuthHeader from "../../components/auth/AuthHeader";
import { login, loginWithFacebook } from "../../store/actions/user";
import {
  showSuccess,
  showError,
  changeLanguageActionSheetOptions,
  changeLanguage,
} from "../../shared/utils";
import Loader from "../../components/UI/Loader";
import HeaderButton from "../../components/UI/HeaderButton";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const changeLanguageHandler = () => {
    showActionSheetWithOptions(changeLanguageActionSheetOptions, (index) => {
      if (index !== 2) {
        changeLanguage(index);
      }
    });
  };

  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-globe"
          color="black"
          onPress={changeLanguageHandler}
        />
      </HeaderButtons>
    ),
  });

  const loginHandler = async (method) => {
    setIsLoading(true);
    if (method === "email") {
      try {
        await dispatch(login(email.trim(), password));
        showSuccess("Login Success", "Welcome to Lost & Found App.");
      } catch (error) {
        showError("Error", error.message);
        setIsLoading(false);
      }
    } else if (method === "facebook") {
      try {
        await dispatch(loginWithFacebook());
        showSuccess("Login Success", "Welcome to Lost & Found App.");
      } catch (error) {
        setIsLoading(false);
        if (error.message !== "") {
          showError("Error", error.message);
        }
      }
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
          <Loader visible={isLoading} />

          <AuthHeader
            style={styles.centerContainer}
            title="Lost & Found"
            subtitle={i18n.t("loginScreen.subtitle")}
            image={require("../../assets/images/logo.png")}
          />

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder={i18n.t("loginScreen.placeHolderEmail")}
              onChangeText={setEmail}
              value={email}
            />
            <MyTextInput
              placeholder={i18n.t("loginScreen.placeHolderPass")}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <MyButton
                title={i18n.t("loginScreen.subtitle")}
                onPress={() => loginHandler("email")}
              />
            </View>
            <View style={{ flex: 0.4, paddingLeft: 30 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: 10,
                }}
                activeOpacity={0.6}
                onPress={() => loginHandler("facebook")}
              >
                <Ionicons name="logo-facebook" size={45} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centerContainer}>
            <MyText>{i18n.t("loginScreen.hint")}</MyText>
            <TouchableOpacity
              onPress={switchToSignUpHandler}
              activeOpacity={0.6}
            >
              <MyText style={styles.switchToSignUpText}>
                {i18n.t("loginScreen.signUp")}
              </MyText>
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
    paddingHorizontal: 35,
    backgroundColor: "white",
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
  switchToSignUpText: {
    fontFamily: "kanit-bold",
    color: colors.grey,
    fontSize: 20,
  },
});

export const screenOptions = {
  headerTitle: "",
  headerStyle: {
    backgroundColor: "#fff",
    elevation: 0,
  },
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(LoginScreen);
