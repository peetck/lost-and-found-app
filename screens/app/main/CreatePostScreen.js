import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../../../components/UI/HeaderButton";
import MyText from "../../../components/UI/MyText";
import MyTextInput from "../../../components/UI/MyTextInput";
import CategoryList from "../../../components/app/main/CategoryList";
import Colors from "../../../constants/Colors";
import {
  takeImage,
  takeImageActionSheetOptions,
  getCurrentPosition,
} from "../../../shared/utility";
import { createPost } from "../../../store/actions/posts";

const CreatePostScreen = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const { showActionSheetWithOptions } = useActionSheet();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("c1");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { params } = props.route;

  const setLocation = (location) => {
    setSelectedLocation({
      ...location,
      mapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${
        location.lat
      },${
        location.long
      }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
        location.lat
      },${location.long}&key=${"AIzaSyAZ4-xmgwetmvZo105AOa7Y23hs8neXAfs"}`,
    });
  };

  useEffect(() => {
    const getLocation = async () => {
      setIsLoadingLocation(true);
      let location;
      if (params) {
        location = params.location;
      } else if (!selectedLocation) {
        location = await getCurrentPosition();
      }
      setLocation(location);
      setIsLoadingLocation(false);
    };
    getLocation();
  }, [params]);

  const takeImageHandler = () => {
    showActionSheetWithOptions(takeImageActionSheetOptions, async (index) => {
      if (index !== 2) {
        const imageUri = await takeImage(index);
        setSelectedImage(imageUri);
      }
    });
  };

  const pickLocationHandler = () => {
    props.navigation.navigate("Map", {
      readonly: false,
      initialLocation: {
        lat: selectedLocation.lat,
        long: selectedLocation.long,
      },
    });
  };

  const createPostHandler = useCallback(async () => {
    if (!selectedImage) {
      return;
    }
    try {
      await dispatch(
        createPost(
          title,
          description,
          categoryId,
          selectedImage,
          selectedLocation,
          new Date(Date.now() + 2 * (3600 * 1000 * 24)), // next 2 day
          uid
        )
      );
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }, [
    dispatch,
    title,
    description,
    categoryId,
    selectedImage,
    selectedLocation,
  ]);

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
        <CategoryList inputMode onChange={setCategoryId} value={categoryId} />
      </View>

      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={0.6}
        onPress={takeImageHandler}
      >
        {selectedImage ? (
          <Image style={styles.image} source={{ uri: selectedImage }} />
        ) : (
          <View style={styles.center}>
            <Ionicons name="md-camera" size={80} color="black" />
            <MyText style={styles.text}>Take a picture</MyText>
          </View>
        )}
      </TouchableOpacity>

      {isLoadingLocation ? (
        <View style={styles.inputContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.inputContainer}
          activeOpacity={0.6}
          onPress={pickLocationHandler}
        >
          {selectedLocation && (
            <Image
              style={styles.image}
              source={{ uri: selectedLocation.mapUrl }}
            />
          )}
        </TouchableOpacity>
      )}
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

export default connectActionSheet(CreatePostScreen);
