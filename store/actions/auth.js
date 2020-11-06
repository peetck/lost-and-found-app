import firebase from "firebase";
import * as Location from "expo-location";

import { getCurrentLocation } from "../../shared/utils";

export const SET_USER = "SET_USER";
export const SET_LOCATION = "SET_LOCATION";
export const LOGOUT = "LOGOUT";

export const loginSuccess = () => {
  return async (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    const ref = await firebase.firestore().collection("users").doc(uid).get();
    const userData = ref.data();

    dispatch({
      type: SET_USER,
      userData: {
        email: userData.email,
        nickname: userData.nickname,
        imageUrl: userData.imageUrl,
      },
    });
  };
};

export const fetchLocation = () => {
  return async (dispatch) => {
    const currentLocation = await getCurrentLocation();

    await Location.watchPositionAsync(
      {
        accuracy: 3,
        timeInterval: 10000,
        distanceInterval: 100,
      },
      (location) => {
        dispatch({
          type: SET_LOCATION,
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        });
      }
    );

    dispatch({
      type: SET_LOCATION,
      location: currentLocation,
    });
  };
};

export const changeNickname = (nickname) => {
  return async (dispatch, getState) => {
    const { uid } = firebase.auth().currentUser;
    const userData = getState().auth;
    await firebase.firestore().collection("users").doc(uid).set({
      email: userData.email,
      nickname: nickname,
      imageUrl: userData.imageUrl,
    });

    dispatch(loginSuccess());
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess());
  };
};

export const signUp = (email, password, nickname, image) => {
  return async (dispatch) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    let fileName = "user_default.png";
    let ref = firebase.storage().ref().child("user_image");

    if (image) {
      const file = await fetch(image);
      const fileBlob = await file.blob();
      fileName = user.uid + ".jpg";
      await ref.child(fileName).put(fileBlob);
    }

    const imageUrl = await ref.child(fileName).getDownloadURL();
    await firebase.firestore().collection("users").doc(user.uid).set({
      email: email,
      nickname: nickname,
      imageUrl: imageUrl,
    });

    dispatch(loginSuccess());
  };
};

export const logout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
    });
  };
};
