import { Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as Updates from "expo-updates";
import jwt_decode from "jwt-decode";
import { API_URL, DEFAULT_USER_IMAGE_URL } from "@env";

import {
  saveIdToken,
  removeIdToken,
  saveRefreshToken,
  removeRefreshToken,
} from "../../shared/storage";

export const SET_USER = "SET_USER";
export const SET_LOCATION = "SET_LOCATION";
export const SET_NICKNAME = "SET_NICKNAME";
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const RESET = "RESET";

export const loginSuccess = (idToken, refreshToken) => {
  return async (dispatch) => {
    const userData = jwt_decode(idToken);
    await saveIdToken(idToken);
    await saveRefreshToken(refreshToken);

    dispatch({
      type: SET_USER,
      userData: {
        email: userData.email,
        nickname: userData.nickname,
        imageUrl: userData.picture,
        uid: userData.sub,
        idToken: idToken,
        refreshToken: refreshToken,
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
      const location = await Location.getCurrentPositionAsync({});
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
  return async (dispatch, getState) => {
    const idToken = getState().user.idToken;
    const username = getState().user.email;
    const uid = getState().user.uid;
    const refreshToken = getState().user.refreshToken;

    const response = await fetch(`${API_URL}/user/changenickname`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": idToken,
      },
      body: JSON.stringify({
        username: username,
        newNickname: nickname,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    dispatch(tryRefreshToken(refreshToken, uid));
  };
};

export const changeImage = (userImage) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;
    const email = getState().user.email;
    const refreshToken = getState().user.refreshToken;

    // upload user image
    const filename = userImage.slice(userImage.lastIndexOf("/") + 1);

    const fileExtension =
      "image/" + userImage.slice(userImage.lastIndexOf(".") + 1);

    const formData = new FormData();

    formData.append("uid", uid);
    formData.append("username", email);
    formData.append("image", {
      uri: userImage,
      name: filename,
      type: fileExtension,
    });

    const response = await fetch(`${API_URL}/user/image`, {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message);
    }

    dispatch(tryRefreshToken(refreshToken, uid));
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.statusCode !== 200) {
      throw new Error(data.body.message);
    }

    dispatch(
      loginSuccess(
        data.body.data.AuthenticationResult.IdToken,
        data.body.data.AuthenticationResult.RefreshToken
      )
    );
  };
};

export const signUp = (email, password, nickname, selectedImage) => {
  return async (dispatch) => {
    // signup user w/ information and imageUrl
    const response = await fetch(`${API_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        email: email,
        password: password,
        picture: DEFAULT_USER_IMAGE_URL,
      }),
    });

    const data = await response.json();

    if (data.statusCode !== 200) {
      throw new Error(data.body.message);
    }

    if (selectedImage) {
      const uid = data.body.data.UserSub;

      // upload user image
      const filename = selectedImage.slice(selectedImage.lastIndexOf("/") + 1);

      const fileExtension =
        "image/" + selectedImage.slice(selectedImage.lastIndexOf(".") + 1);

      const formData = new FormData();

      formData.append("uid", uid);
      formData.append("username", email);
      formData.append("image", {
        uri: selectedImage,
        name: filename,
        type: fileExtension,
      });

      await fetch(`${API_URL}/user/image`, {
        method: "POST",
        headers: {
          "Content-type": "multipart/form-data",
        },
        body: formData,
      });
    }

    dispatch(login(email, password));
  };
};

export const logout = () => {
  return async (dispatch) => {
    await removeIdToken();
    await removeRefreshToken();
    await dispatch({
      type: RESET,
    });
  };
};

export const tryRefreshToken = (refreshTokenFromStorage, uid) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/user/refreshtoken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshTokenFromStorage,
        uid: uid,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      await dispatch(
        loginSuccess(
          data.body.data.AuthenticationResult.IdToken,
          refreshTokenFromStorage
        )
      );
    } else {
      throw new Error("Invalid refresh token");
    }
  };
};
