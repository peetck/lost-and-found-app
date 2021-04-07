import firebase from "firebase";
import * as geofirestore from "geofirestore";
import * as geokit from "geokit";
import { reset } from "i18n-js";

import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchAllPosts = (currentLocation, radius) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://yldoibdrk8.execute-api.ap-southeast-1.amazonaws.com/development/posts?lat=${currentLocation.lat}&lng=${currentLocation.lng}&rad=${radius}`
    );

    const data = await response.json();

    const posts = [];

    data.forEach((post) => {
      const id = post.rangeKey.S;

      const expirationDate = new Date(post.expirationDate.S);

      const { coordinates } = JSON.parse(post.geoJson.S);
      const lat = coordinates[0];
      const lng = coordinates[1];

      const distance = geokit.distance(currentLocation, {
        lat: lat,
        lng: lng,
      });

      const dateDiff = expirationDate.getTime() - new Date();

      if (dateDiff > 0) {
        posts.push(
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

    dispatch({
      type: SET_POSTS,
      posts: posts,
    });
  };
};

export const fetchMyPosts = (currentLocation) => {
  return async (dispatch, getState) => {
    // current user location

    const uid = getState().user.uid;

    const response = await fetch(
      `https://yldoibdrk8.execute-api.ap-southeast-1.amazonaws.com/development/user/posts?uid=${uid}`
    );

    const data = await response.json();

    const myPosts = [];

    data.Items.forEach((post) => {
      const id = post.rangeKey.S;

      const { coordinates } = JSON.parse(post.geoJson.S);
      const lat = coordinates[0];
      const lng = coordinates[1];

      const expirationDate = new Date(post.expirationDate.S);

      const distance = geokit.distance(currentLocation, {
        lat: lat,
        lng: lng,
      });

      const dateDiff = expirationDate.getTime() - new Date();

      if (dateDiff > 0) {
        myPosts.push(
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

    dispatch({
      type: SET_MY_POSTS,
      myPosts: myPosts,
    });
  };
};

export const createPost = (
  title,
  description,
  categoryId,
  selectedImage,
  selectedLocation,
  expirationDate
) => {
  return async (dispatch, getState) => {
    const uid = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();
    const geoFirestore = geofirestore.initializeApp(firestore);
    const postsCollection = geoFirestore.collection("posts");

    const { id } = await postsCollection.add({
      title,
      description,
      categoryId,
      coordinates: new firebase.firestore.GeoPoint(
        selectedLocation.lat,
        selectedLocation.lng
      ),
      mapUrl: selectedLocation.mapUrl,
      expirationDate: expirationDate.toISOString(),
      uid,
      address: selectedLocation.address,
    });

    const ref = firebase.storage().ref().child("posts");
    const fileName = id + ".jpg";
    const file = await fetch(selectedImage);
    const fileBlob = await file.blob();
    await ref.child(fileName).put(fileBlob);
    const imageUrl = await ref.child(fileName).getDownloadURL();

    await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .set({ imageUrl }, { merge: true });

    const currentPosition = getState().user.location;

    const distance = geokit.distance(currentPosition, {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });

    dispatch({
      type: CREATE_POST,
      post: new Post(
        id,
        title,
        description,
        categoryId,
        imageUrl,
        selectedLocation.mapUrl,
        selectedLocation.lat,
        selectedLocation.lng,
        expirationDate,
        uid,
        distance,
        selectedLocation.address
      ),
    });
  };
};
