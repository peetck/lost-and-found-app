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

import CategoryList from "../../../components/app/main/CategoryList";
import PostList from "../../../components/app/main/PostList";
import colors from "../../../shared/colors";
import { getCurrentPosition } from "../../../shared/utils";
import Post from "../../../models/post";

const SearchScreen = (props) => {
  const initialCategories = useSelector((state) =>
    state.categories.categories.map((category) => category.id)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategories
  );
  const [selectedLocation, setSelectedLocation] = useState();
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { params } = props.route;

  const getLocation = async () => {
    setIsLoadingLocation(true);
    let location;
    if (params) {
      location = params.location;
    } else if (!selectedLocation) {
      location = await getCurrentPosition();
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
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  searchIcon: {
    padding: 8,
  },
  searchTextInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    fontSize: 16,
  },
});

export const screenOptions = {
  headerTitle: "Search by location",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default SearchScreen;
