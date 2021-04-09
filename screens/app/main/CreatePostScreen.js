import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18n-js";

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
import { API_KEY } from "@env";

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

  const descriptionRef = useRef(null);

  const getLocation = async () => {
    setIsLoadingLocation(true);
    let location;
    if (params) {
      location = params.location;
    } else {
      location = selectedLocation;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
    );
    const resData = await response.json();

    setSelectedLocation({
      ...location,
      address: resData.results[0].formatted_address,
      mapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${API_KEY}`,
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
    Keyboard.dismiss();
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
        showSuccess(i18n.t("createPostScreen.postCreated"), title);
        props.navigation.goBack();
      } catch (error) {
        showError(error.message);
      }
    } else {
      showError(i18n.t("createPostScreen.error"));
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
        <MyText style={styles.title}>
          {i18n.t("createPostScreen.header1")}
        </MyText>
      </View>

      <View style={styles.textInputContainer}>
        <MyTextInput
          placeholder={i18n.t("createPostScreen.title")}
          value={title}
          onChangeText={setTitle}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
        />
        <MyTextInput
          placeholder={i18n.t("createPostScreen.description")}
          value={description}
          onChangeText={setDescription}
          ref={descriptionRef}
        />
      </View>

      <CategoryList inputMode onChange={setCategoryId} value={categoryId} />

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>
          {i18n.t("createPostScreen.header2")}
        </MyText>
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
            <Ionicons
              name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
              size={80}
              color="black"
            />
            <MyText style={styles.imageText}>
              {i18n.t("createPostScreen.imgHolder")}
            </MyText>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>
          {i18n.t("createPostScreen.header3")}
        </MyText>
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
  text: {
    fontSize: 15,
  },
});

export const screenOptions = {
  headerTitle: i18n.t("createPostScreen.headerTitle"),
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default connectActionSheet(CreatePostScreen);
