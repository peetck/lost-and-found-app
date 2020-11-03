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

import SettingItem from "../../../components/app/settings/SettingItem";

const ProfileSettingScreen = (props) => {
  const [pickedImage, setPickedImage] = useState(
    "https://static.wixstatic.com/media/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.png/v1/fill/w_173,h_172,al_c,q_85,usm_0.66_1.00_0.01/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.webp"
  );

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={{
                uri: pickedImage,
              }}
            />
          </TouchableOpacity>
        </View>

        <SettingItem
          HeaderText="Nickname"
          title="Picnic"
          onPress={() => {
            props.navigation.navigate("NicknameEdit");
          }}
          color="default"
        />
        <SettingItem
          HeaderText="Tel"
          title="081 000 0000"
          onPress={() => {}}
          color="default"
        />
        <SettingItem
          HeaderText="Email"
          title="example@hotmail.com"
          onPress={() => {}}
          color="default"
        />
        <SettingItem
          HeaderText="Birthday"
          title="01-05-2000"
          onPress={() => {}}
          color="default"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export const screenOptions = {
  title: "Personal Information",
};

export default ProfileSettingScreen;
