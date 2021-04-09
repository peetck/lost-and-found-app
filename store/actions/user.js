import firebase from "firebase";
import { Alert } from "react-native";
import * as Location from "expo-location";
import * as Facebook from "expo-facebook";
import * as Permissions from "expo-permissions";
import * as Updates from "expo-updates";

export const SET_USER = "SET_USER";
export const SET_LOCATION = "SET_LOCATION";
export const SET_NICKNAME = "SET_NICKNAME";
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const RESET = "RESET";

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

const getCurrentLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant location permissions to use this app.",
      [{ text: "Retry", onPress: () => Updates.reloadAsync() }]
    );
    return;
  } else {
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      return {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again later.", [
        { text: "Retry", onPress: () => Updates.reloadAsync() },
      ]);
    }
  }
};

export const fetchLocation = () => {
  return async (dispatch) => {
    const currentLocation = await getCurrentLocation();

    await Location.watchPositionAsync(
      {
        accuracy: 6,
        timeInterval: 5000,
        distanceInterval: 20,
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
  return async (dispatch) => {
    const { uid } = firebase.auth().currentUser;
    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({ nickname: nickname }, { merge: true });

    dispatch({
      type: SET_NICKNAME,
      nickname: nickname,
    });
  };
};

export const changeImage = (userImage) => {
  return async (dispatch) => {
    const { uid } = firebase.auth().currentUser;

    let ref = firebase.storage().ref().child("user_image");
    let fileName = userImage;

    if (userImage) {
      const file = await fetch(userImage);
      const fileBlob = await file.blob();
      fileName = uid + ".jpg";
      await ref.child(fileName).put(fileBlob);
    }

    const imageUrl = await ref.child(fileName).getDownloadURL();

    await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .set({ imageUrl: imageUrl }, { merge: true });

    dispatch({
      type: SET_IMAGE_URL,
      imageUrl: imageUrl,
    });
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

export const loginWithFacebook = () => {
  return async (dispatch) => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync();

    if (type === "success") {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase
        .auth()
        .signInWithCredential(credential);

      const uid = facebookProfileData.user.uid;
      const email = facebookProfileData.additionalUserInfo.profile.email;
      const nickname = facebookProfileData.additionalUserInfo.profile.name;
      const imageUrl =
        facebookProfileData.additionalUserInfo.profile.picture.data.url;
      const isNewUser = facebookProfileData.additionalUserInfo.isNewUser;

      if (isNewUser) {
        await firebase.firestore().collection("users").doc(uid).set({
          email: email,
          nickname: nickname,
          imageUrl: imageUrl,
        });
      }

      dispatch(loginSuccess());
    } else {
      throw new Error("");
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch({
      type: RESET,
    });
  };
};
