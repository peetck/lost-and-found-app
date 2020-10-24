import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, ScrollView,AppHeader } from "react-native";
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

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
         

          <View style={{ marginTop: 60 }}>
            <MyText style={{ fontSize: 22, fontWeight: "bold" }}>
              Update Profile
            </MyText>
            <View
              style={[
                styles.updateProfileContainer,
                { justifyContent: "center" },
              ]}
            >
              <MyText style={{ fontSize: 20 }}>Email</MyText>
              <View style={styles.inputContainer}>
                <MyTextInput
                  editable={false}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
              </View>

              <View style={{ marginTop: -20 }}>
                <MyText style={{ fontSize: 20 }}>Nickname</MyText>
                <View style={styles.inputContainer}>
                  <MyTextInput
                    placeholder="Nickname"
                    onChangeText={(text) => setNickname(text)}
                    value={nickname}
                  />
                </View>
              </View>

              <View style={{ alignSelf: "flex-end", marginTop: -20 }}>
                <MyButton
                  title="Update"
                  style={{ fontFamily: "kanit-light", fontSize: 15 }}
                />
              </View>
            </View>
          </View>
          <View style={{ marginTop: -10 }}>
            <MyText style={{ fontSize: 22, fontWeight: "bold" }}>
              Update Profile
            </MyText>
            <View
              style={[
                styles.updateProfileContainer,
                { justifyContent: "center" },
              ]}
            >
              <MyText style={{ fontSize: 20 }}>Email</MyText>
              <View style={styles.inputContainer}>
                <MyTextInput
                  editable={false}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />
              </View>

              <View style={{ marginTop: -20 }}>
                <MyText style={{ fontSize: 20 }}>Nickname</MyText>
                <View style={styles.inputContainer}>
                  <MyTextInput
                    placeholder="Nickname"
                    onChangeText={(text) => setNickname(text)}
                    value={nickname}
                  />
                </View>
              </View>

              <View style={{ alignSelf: "flex-end", marginTop: -20 }}>
                <MyButton
                  title="Update"
                  style={{ fontFamily: "kanit-light", fontSize: 15 }}
                  onPress={() => {
                    firebase.auth().signOut();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
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
    justifyContent: "center",
  },
  updateProfileContainer: {
    flex: 1,
    margin: 15,
  },
  textInputContainer: {
    justifyContent: "center",
  },
  inputContainer: {
    margin: 10,
  },
});

export const screenOptions = {};

export default MyProfileScreen;
