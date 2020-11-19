import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";

import SettingItem from "../../../components/app/settings/SettingItem";
import {
  changeNickname,
  changeImage,
  deleteAccount,
} from "../../../store/actions/user";
import { takeImage, takeImageActionSheetOptions } from "../../../shared/utils";
import Loader from "../../../components/UI/Loader";


const AccountSettingScreen = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { showActionSheetWithOptions } = useActionSheet();

  const [pickedImage, setPickedImage] = useState(
    "https://static.wixstatic.com/media/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.png/v1/fill/w_173,h_172,al_c,q_85,usm_0.66_1.00_0.01/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.webp"
  );
  const [selectedImage, setSelectedImage] = useState();

  const [editTile, setEditTitle] = useState();

  const [isLoading, setIsLoading] = useState(false);

  {
    /* Function */
  }
  const takeImageHandler = () => {
    showActionSheetWithOptions(takeImageActionSheetOptions, async (index) => {
      if (index !== 2) {
        const imageUri = await takeImage(index);
        setSelectedImage(imageUri);
        await dispatch(changeImage(imageUri));
      }
    });
  };

  {
    /* Return JSX */
  }
  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
      {/* image part */}
      <View style={styles.containerImage}>
        <View style={styles.containerLayoutImage}>
          {/* Image */}
          <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
            <Image source={{ uri: user.imageUrl }} style={styles.imageStyle} />
            <View style={styles.iconContainer}>
              <Ionicons name="md-camera" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content part */}
      <View style={styles.containerContents}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SettingItem
            color = '#1b6ca8'
            title="Nickname"
            text={user.nickname}
            type="text"
            onPress={() => {
              props.navigation.navigate("ChangeNameSetting");
            }}
          />
          <SettingItem
            title="Delete Account"
            text={
              "If you sign up again with the same email or FB all of your post'll not belong to you."
            }
            type="text"
            onPress={async () => {
              setIsLoading(true);
              try {
                dispatch(deleteAccount());
              } catch (error) {
                setIsLoading(false);
              }
            }}
            color = 'red'
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
    backgroundColor: "#f9f9f9",
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
  title: "Account",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default AccountSettingScreen;
