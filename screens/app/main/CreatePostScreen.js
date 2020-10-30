import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import MyTextInput from "../../../components/UI/MyTextInput";
import CategoryList from "../../../components/app/main/CategoryList";
import Colors from "../../../constants/Colors";

const CreatePostScreen = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("c1");

  const createPostHandler = useCallback(() => {
    console.log(title);
    console.log(description);
    console.log(category);
  }, [title, description, category]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item iconName="md-save" color="black" onPress={createPostHandler} />
        </HeaderButtons>
      ),
    });
  }, [createPostHandler]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.titleInputContainer}>
        <MyTextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.descriptionInputContainer}>
        <MyTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.categoryListContainer}>
        <CategoryList inputMode onChange={setCategory} value={category} />
      </View>

      <TouchableOpacity style={styles.inputContainer} activeOpacity={0.6}>
        <Ionicons name="md-camera" size={80} color="black" />
        <MyText style={styles.text}>Take a picture</MyText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={0.6}
        onPress={() => {
          props.navigation.navigate("Map");
        }}
      >
        <Ionicons name="md-map" size={80} color="black" />
        <MyText style={styles.text}>Pick location</MyText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  titleInputContainer: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  descriptionInputContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  categoryListContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  text: {
    fontSize: 16,
  },
});

export const screenOptions = {
  headerTitle: "Create Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default CreatePostScreen;
