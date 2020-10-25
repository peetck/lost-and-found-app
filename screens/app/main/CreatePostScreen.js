import React, { useState } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";

import MyText from "../../../components/UI/MyText";
import MyButton from "../../../components/UI/MyButton";
import MyTextInput from "../../../components/UI/MyTextInput";

const CreatePostScreen = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <MyText style={styles.title}>Information</MyText>
        <View style={styles.inputContainer}>
          <MyTextInput placeholder="Title" onChangeText={setTitle} />
          <MyTextInput
            placeholder="Description"
            onChangeText={setDescription}
          />
        </View>
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>Picture</MyText>
        <View style={styles.inputContainer}>
          <View style={styles.imageContainer} />
          <Button title="take a picture" />
        </View>
      </View>

      <View style={styles.container}>
        <MyText style={styles.title}>Location</MyText>
        <View style={styles.inputContainer}>
          <View style={styles.imageContainer} />
          <Button title="pick location" />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <MyButton
          title="Create"
          onPress={() => {
            console.log(title);
            console.log(description);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  container: {
    paddingTop: 15,
  },
  imageContainer: {
    backgroundColor: "pink",
    width: "100%",
    height: 120,
  },
  buttonContainer: {
    paddingVertical: 35,
  },
  inputContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 19,
  },
});

export const screenOptions = {
  headerTitle: "Create Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default CreatePostScreen;
