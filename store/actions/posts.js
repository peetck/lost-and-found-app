import firebase from "firebase";
import * as geofirestore from "geofirestore";
import * as geokit from "geokit";

import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchAllPosts = (currentLocation, radius) => {
  return async (dispatch) => {
    const posts = [];

    const firestore = firebase.firestore();
    const geoFirestore = geofirestore.initializeApp(firestore);
    const postsCollection = geoFirestore.collection("posts");
    const query = postsCollection.near({
      center: new firebase.firestore.GeoPoint(
        currentLocation.lat,
        currentLocation.lng
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
            post.distance,
            data.address
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
  return async (dispatch) => {
    // current user location

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

      const expirationDate = new Date(data.expirationDate);

      const dateDiff = expirationDate.getTime() - new Date();

      const distance = geokit.distance(currentLocation, {
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
            distance,
            data.address
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

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=AIzaSyAZ4-xmgwetmvZo105AOa7Y23hs8neXAfs`
    );

    const resData = await response.json();

    const address = resData.results[0].formatted_address;

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
      address,
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
        address
      ),
    });
  };
};
