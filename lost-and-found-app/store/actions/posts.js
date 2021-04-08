import * as geokit from "geokit";
import { API_URL } from "@env";

import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchAllPosts = (currentLocation, radius) => {
  return async (dispatch) => {
    const response = await fetch(
      `${API_URL}/posts?lat=${currentLocation.lat}&lng=${currentLocation.lng}&rad=${radius}`
    );

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

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

    const response = await fetch(`${API_URL}/user/posts?uid=${uid}`);

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

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
    const uid = getState().user.uid;
    const idToken = getState().user.idToken;

    const filename = selectedImage.slice(selectedImage.lastIndexOf("/") + 1);

    const fileExtension =
      "image/" + selectedImage.slice(selectedImage.lastIndexOf(".") + 1);

    const formData = new FormData();

    formData.append("lat", selectedLocation.lat);
    formData.append("lng", selectedLocation.lng);
    formData.append("address", selectedLocation.address);
    formData.append("description", description);
    formData.append("expirationDate", expirationDate.toISOString());
    formData.append("mapUrl", selectedLocation.mapUrl);
    formData.append("title", title);
    formData.append("uid", uid);
    formData.append("image", {
      uri: selectedImage,
      name: filename,
      type: fileExtension,
    });
    formData.append("categoryId", categoryId);

    const response = await fetch(`${API_URL}/user/post`, {
      method: "POST",
      headers: {
        "Content-type": "multipart/form-data",
        "x-api-key": idToken,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message);
    }

    const currentPosition = getState().user.location;

    const distance = geokit.distance(currentPosition, {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });

    const id = data.rangeKey.S;
    const imageUrl = data.imageUrl.S;

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
