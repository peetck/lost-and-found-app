import firebase from "firebase";
import * as geofirestore from "geofirestore";

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
        currentPosition.long
      ),
      radius: radius,
    });

    const response = await query.get();

    response.forEach((post) => {
      const id = post.id;
      const data = post.data();
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
          new Date(data.expirationDate),
          data.uid
        )
      );
    });

    dispatch({
      type: SET_POSTS,
      posts: posts,
    });
  };
};

export const fetchMyPosts = () => {
  return async (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    const response = await firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", uid)
      .get();

    const myPosts = [];

    response.forEach((post) => {
      const id = post.id;
      const data = post.data();
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
          data.uid
        )
      );
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
        selectedLocation.long
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
        selectedLocation.long,
        expirationDate,
        uid
      ),
    });
  };
};
