import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import firebase from "firebase";
import * as geofirestore from "geofirestore";
import { useSelector } from "react-redux";
import { CardStyleInterpolators } from "@react-navigation/stack";

import CategoryList from "../../../components/app/main/CategoryList";
import PostList from "../../../components/app/main/PostList";
import colors from "../../../shared/colors";
import Post from "../../../models/post";
import MyText from "../../../components/UI/MyText";

const SearchScreen = (props) => {
  const initialCategories = useSelector((state) =>
    state.categories.categories.map((category) => category.id)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategories
  );
  const currentLocation = useSelector((state) => state.auth.location);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState([]);
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
    if (!selectedLocation) {
      return;
    }
    const firestore = firebase.firestore();
    const geoFirestore = geofirestore.initializeApp(firestore);
    const postsCollection = geoFirestore.collection("posts");
    const query = postsCollection.near({
      center: new firebase.firestore.GeoPoint(
        selectedLocation.lat,
        selectedLocation.lng
      ),
      radius: 10,
    });

    const response = await query.get();

    const result = [];

    response.forEach((post) => {
      const id = post.id;
      const data = post.data();

      const expirationDate = new Date(data.expirationDate);

      const dateDiff = expirationDate.getTime() - new Date();
      if (dateDiff > 0) {
        result.push(
          new Post(
            id,
            data.title,
            data.description,
            data.categoryId,
            data.imageUrl,
            data.mapUrl,
            data.coordinates.latitude,
            data.coordinates.longitude,
            expirationDate,
            data.uid,
            post.distance,
            data.address
          )
        );
      }
    });

    setPosts(result);
    setShowPosts(result);
  };

  useEffect(() => {
    setShowPosts(
      posts.filter((post) => selectedCategories.includes(post.categoryId))
    );
  }, [selectedCategories]);

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
        <MyText style={styles.title}>Location</MyText>
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
        <MyText style={styles.title}>Result (~10km)</MyText>
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
  },
  title: {
    fontFamily: "kanit",
    fontSize: 19,
  },
});

export const screenOptions = {
  headerTitle: "Search by location",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default SearchScreen;
