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
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import MyTextInput from "../../../components/UI/MyTextInput";
import CategoryList from "../../../components/app/main/CategoryList";
import Colors from "../../../constants/Colors";

const CreatePostScreen = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("c1");
  const [pickedImage, setPickedImage] = useState("");

  const createPostHandler = useCallback(() => {
    console.log(title);
    console.log(description);
    console.log(category);
  }, [title, description, category]);

  const verifyPermissions = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (hasPermission) {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      setPickedImage(image.uri);
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            iconName="md-checkmark"
            color="black"
            onPress={createPostHandler}
          />
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

      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={0.6}
        onPress={takeImageHandler}
      >
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.image} />
        ) : (
          <View style={styles.center}>
            <Ionicons name="md-camera" size={80} color="black" />
            <MyText style={styles.text}>Take a picture</MyText>
          </View>
        )}
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
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
