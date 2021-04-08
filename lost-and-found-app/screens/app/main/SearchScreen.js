import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as geokit from "geokit";
import { useSelector } from "react-redux";
import { CardStyleInterpolators } from "@react-navigation/stack";
import i18n from "i18n-js";

import CategoryList from "../../../components/app/main/CategoryList";
import PostList from "../../../components/app/main/PostList";
import colors from "../../../shared/colors";
import Post from "../../../models/post";
import MyText from "../../../components/UI/MyText";
import { GOOGLE_MAPS_API_KEY, API_URL } from "@env";

const SearchScreen = (props) => {
  const initialCategories = useSelector((state) =>
    state.categories.categories.map((category) => category.id)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategories
  );
  const currentLocation = useSelector((state) => state.user.location);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(posts);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { params } = props.route;

  const getLocation = async () => {
    setIsLoadingLocation(true);
    let location;
    if (params) {
      location = params.location;
    } else {
      location = selectedLocation;
    }
    setSelectedLocation({
      ...location,
      mapUrl: `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${GOOGLE_MAPS_API_KEY}`,
    });
    setIsLoadingLocation(false);
  };

  useEffect(() => {
    getLocation();
  }, [params]);

  const pickLocationHandler = () => {
    props.navigation.navigate("Map", {
      readonly: false,
      initialLocation: {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      },
      from: "Search",
    });
  };

  const fetchPosts = async () => {
    const response = await fetch(
      `${API_URL}/posts?lat=${selectedLocation.lat}&lng=${
        selectedLocation.lng
      }&rad=${5000}`
    );

    const data = await response.json();

    const result = [];

    data.forEach((post) => {
      const id = post.rangeKey.S;

      const expirationDate = new Date(post.expirationDate.S);

      const { coordinates } = JSON.parse(post.geoJson.S);
      const lat = coordinates[0];
      const lng = coordinates[1];

      const distance = geokit.distance(selectedLocation, {
        lat: lat,
        lng: lng,
      });

      const dateDiff = expirationDate.getTime() - new Date();

      if (dateDiff > 0) {
        result.push(
          new Post(
            id,
            post.title.S,
            post.description.S,
            post.categoryId.S,
            post.imageUrl.S,
            post.mapUrl.S,
            lat,
            lng,
            expirationDate,
            post.uid.S,
            distance,
            post.address.S
          )
        );
      }
    });

    setPosts(result);
  };

  useEffect(() => {
    setShowPosts(
      posts.filter((post) => selectedCategories.includes(post.categoryId))
    );
  }, [selectedCategories, posts]);

  useEffect(() => {
    fetchPosts();
  }, [selectedLocation]);

  const header = (
    <View>
      <CategoryList
        inputMode
        many
        value={selectedCategories}
        onChange={setSelectedCategories}
      />

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>{i18n.t("searchScreen.header1")}</MyText>
      </View>

      {isLoadingLocation ? (
        <View style={styles.mapContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.mapContainer}
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

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>{i18n.t("searchScreen.header2")}</MyText>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <PostList
        data={showPosts}
        navigation={props.navigation}
        header={header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
    paddingTop: 25,
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
  },
  titleContainer: {
    paddingVertical: 25,
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
  title: {
    fontFamily: "kanit",
    fontSize: 19,
  },
});

export const screenOptions = {
  headerTitle: i18n.t("searchScreen.headerTitle"),
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default SearchScreen;
