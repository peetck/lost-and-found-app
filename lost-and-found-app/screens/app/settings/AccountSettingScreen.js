import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import i18n from "i18n-js";

import SettingItem from "../../../components/app/settings/SettingItem";
import { changeImage } from "../../../store/actions/user";
import { takeImage, takeImageActionSheetOptions } from "../../../shared/utils";
import Loader from "../../../components/UI/Loader";

const AccountSettingScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { showActionSheetWithOptions } = useActionSheet();

  const [selectedImage, setSelectedImage] = useState(user.imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const takeImageHandler = () => {
    showActionSheetWithOptions(takeImageActionSheetOptions, async (index) => {
      if (index !== 2) {
        const imageUri = await takeImage(index);
        setIsLoading(true);
        if (imageUri) {
          await dispatch(changeImage(imageUri));
          setSelectedImage(imageUri);
        }
        setIsLoading(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />

      <View style={styles.containerImage}>
        <View style={styles.containerLayoutImage}>
          <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
            <Image source={{ uri: selectedImage }} style={styles.imageStyle} />

            <View style={styles.iconContainer}>
              <Ionicons
                name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
                size={30}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerContents}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SettingItem
            title={i18n.t("accountSettingScreen.email")}
            text={user.email}
          />
          <SettingItem
            title={i18n.t("accountSettingScreen.nickname")}
            text={user.nickname}
            onPress={() => {
              props.navigation.navigate("ChangeNickname");
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  },
  containerLayoutImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerContents: {
    flex: 3,
    backgroundColor: "white",
  },
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  iconContainer: {
    position: "absolute",
    right: -1,
    bottom: -5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
});

export const screenOptions = {
  title: i18n.t("accountSettingScreen.headerTitle"),
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default connectActionSheet(AccountSettingScreen);
