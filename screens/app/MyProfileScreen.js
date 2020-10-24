import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import firebase from "firebase";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";

const MyProfileScreen = (props) => {
  const [email, setEmail] = useState("Example@gmail.com");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [pickedImage, setPickedImage] = useState(
    "https://static.wixstatic.com/media/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.png/v1/fill/w_173,h_172,al_c,q_85,usm_0.66_1.00_0.01/2bc47f_9c0772b096b84b80b7aee6f7eee794d8~mv2.webp"
  );


  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.contentContainer}>
      <Image
      style={styles.image}
        source={{
          uri: pickedImage
        }}
      />
      </View>

     


        <View style={{ flex: 2 ,marginTop:20}}>
          <MyText style={{ fontSize: 20 }}>Nickname</MyText>
          <View style={styles.inputContainer}>
            <MyTextInput
              placeholder="Nickname"
              onChangeText={(text) => setNickname(text)}
              value={nickname}
            />
          </View>
        </View>

        <MyButton
                  title="Change"
                  style={{ fontFamily: "kanit-light", fontSize: 15 }}
                  onPress={() => {
                    firebase.auth().signOut();
                  }}
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
  
  inputContainer: {
    margin: 10,
  },  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
});

export const screenOptions = {};

export default MyProfileScreen;
