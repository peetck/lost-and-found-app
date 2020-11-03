import firebase from "firebase";
import * as geofirestore from "geofirestore";
import * as geokit from "geokit";

import { getCurrentPosition } from "../../shared/utils";
import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchAllPosts = (radius) => {
  return async (dispatch) => {
    const posts = [];

    // current user location
    const currentPosition = await getCurrentPosition();

    const firestore = firebase.firestore();
    const geoFirestore = geofirestore.initializeApp(firestore);
    const postsCollection = geoFirestore.collection("posts");
    const query = postsCollection.near({
      center: new firebase.firestore.GeoPoint(
        currentPosition.lat,
        currentPosition.lng
      ),
      radius: radius,
    });

    const response = await query.get();

    response.forEach((post) => {
      const id = post.id;
      const data = post.data();

      const expirationDate = new Date(data.expirationDate);

      const dateDiff = expirationDate.getTime() - new Date();
      if (dateDiff > 0) {
        posts.push(
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
            post.distance
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

export const fetchMyPosts = () => {
  return async (dispatch) => {
    // current user location

    const uid = firebase.auth().currentUser.uid;
    const response = await firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", uid)
      .get();

    const myPosts = [];

    const currentPosition = await getCurrentPosition();

    response.forEach((post) => {
      const id = post.id;
      const data = post.data();

      const expirationDate = new Date(data.expirationDate);

      const dateDiff = expirationDate.getTime() - new Date();

      const distance = geokit.distance(currentPosition, {
        lat: data.coordinates.latitude,
        lng: data.coordinates.longitude,
      });

      if (dateDiff > 0) {
        myPosts.push(
          new Post(
            id,
            data.title,
            data.description,
            data.categoryId,
            data.imageUrl,
            data.mapUrl,
            data.coordinates.latitude,
            data.coordinates.longitude,
            new Date(data.expirationDate),
            data.uid,
            distance
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
  return async (dispatch) => {
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
    });

    const ref = firebase.storage().ref().child("posts");
    const fileName = id + ".jpg";
    const file = await fetch(selectedImage);
    const fileBlob = await file.blob();
    await ref.child(fileName).put(fileBlob);
    const imageUrl = await ref.child(fileName).getDownloadURL();

    await firebase.firestore().collection("posts").doc(id).set(
      {
        imageUrl,
      },
      { merge: true }
    );

    const currentPosition = await getCurrentPosition();

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
        distance
      ),
    });
  };
};
