import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import MyButton from "../../components/UI/MyButton";

const NextSignUpScreen = (props) => {
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <MyText style={styles.title}>Lost & Found</MyText>
            <MyText style={styles.subtitle}>Sign up</MyText>
          </View>

          <View style={styles.inputImageContainer}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg",
              }}
            />
            <View style={styles.textInputContainer}>
              <MyTextInput placeholder="Nickname" />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <MyButton title="Sign up" />
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
  inputImageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  textInputContainer: {
    paddingTop: 30,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "kanit-bold",
  },
  subtitle: {
    fontSize: 35,
  },
  image: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
});

export default NextSignUpScreen;
