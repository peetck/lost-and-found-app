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
import colors from "../../../shared/colors";
import {
  takeImage,
  takeImageActionSheetOptions,
  showSuccess,
  showError,
} from "../../../shared/utils";
import { createPost } from "../../../store/actions/posts";
import Loader from "../../../components/UI/Loader";

const CreatePostScreen = (props) => {
  const { params } = props.route;

  const dispatch = useDispatch();
  const initialCategoryId = useSelector(
    (state) => state.categories.categories[0].id
  );

  const { showActionSheetWithOptions } = useActionSheet();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [selectedImage, setSelectedImage] = useState();
  const currentLocation = useSelector((state) => state.user.location);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const getLocation = async () => {
    setIsLoadingLocation(true);
    let location;
    if (params) {
      location = params.location;
    } else {
      location = selectedLocation;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=AIzaSyAZ4-xmgwetmvZo105AOa7Y23hs8neXAfs`
    );
    const resData = await response.json();

    setSelectedLocation({
      ...location,
      address: resData.results[0].formatted_address,
      mapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${
        location.lat
      },${
        location.lng
      }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
        location.lat
      },${location.lng}&key=${"AIzaSyAZ4-xmgwetmvZo105AOa7Y23hs8neXAfs"}`,
    });
    setIsLoadingLocation(false);
  };

  useEffect(() => {
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
        lng: selectedLocation.lng,
      },
      from: "CreatePost",
    });
  };

  const createPostHandler = useCallback(async () => {
    setIsLoading(true);
    if (selectedImage && title !== "" && description !== "") {
      try {
        await dispatch(
          createPost(
            title,
            description,
            categoryId,
            selectedImage,
            selectedLocation,
            new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // next 2 day
          )
        );
        showSuccess("Post Created", title);
        props.navigation.goBack();
      } catch (error) {
        showError("Error", error.message);
      }
    } else {
      showError("Error", "Please complete all information.");
    }
    setIsLoading(false);
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
      <Loader visible={isLoading} />

      <View style={{ ...styles.titleContainer, paddingTop: 25 }}>
        <MyText style={styles.title}>Information</MyText>
      </View>

      <View style={styles.textInputContainer}>
        <MyTextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <MyTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <CategoryList inputMode onChange={setCategoryId} value={categoryId} />

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>Image</MyText>
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
            <MyText style={styles.imageText}>Take a picture</MyText>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>Location</MyText>
      </View>

      {isLoadingLocation ? (
        <View style={styles.inputContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
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

      <View style={styles.addressContainer}>
        <MyText style={styles.text}>{selectedLocation.address}</MyText>
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
  titleContainer: {
    paddingVertical: 25,
  },
  textInputContainer: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 5,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
  },
  addressContainer: {
    paddingTop: 25,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageText: {
    fontSize: 16,
  },
  title: {
    fontFamily: "kanit",
    fontSize: 19,
  },
});

export const screenOptions = {
  headerTitle: "Create Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default connectActionSheet(CreatePostScreen);
