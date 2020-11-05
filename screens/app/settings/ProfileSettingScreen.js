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

    <View style = {styles.container}>

      {/* image part */}

      <View style = {styles.containerImage}>
        <View style = {styles.containerLayoutImage}>

          {/* Visual Image*/}
          <View style = {{width: 100, height: 100, borderRadius: 60, backgroundColor: '#BED7D1'}} />

        </View>
      </View>

      {/* Content part */}
      <View style = {styles.containerContents}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SettingItem HeaderText = 'Nickname' title = 'Pepper' color = 'default' type = 'text' onPress = {
              () => {
                console.log(1)
              }
            }></SettingItem>
            <SettingItem HeaderText = 'Telephone' title = '081 000 0000' color = 'default' type = 'text' onPress = {
              () => {
                console.log(2)
              }
            }></SettingItem>
            <SettingItem HeaderText = 'Email' title = 'example@hotmail.com' color = 'default' type = 'text' onPress = {
              () => {
                console.log(3)
              }
            } ></SettingItem>
            <SettingItem HeaderText = 'Birthday' title = '01-05-2000' color = 'default' type = 'text' onPress = {
              () => {
                console.log(4)
              }
            } ></SettingItem>
            
          </ScrollView>
      </View>
      
      
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#FFDFD3'
  },
  containerLayoutImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerContents: {
    flex: 3,
    backgroundColor: 'white'
  },
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },

});

export const screenOptions = {
  title: "Personal Information",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default ProfileSettingScreen;
