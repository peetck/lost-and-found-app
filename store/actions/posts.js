import firebase from "firebase";
import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchPosts = () => {
  return async (dispatch) => {
    const response = await firebase.firestore().collection("posts").get();

    const posts = [];
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
          data.location.lat,
          data.location.long,
          new Date(data.expirationDate)
        )
      );
    });

    dispatch({
      type: SET_POSTS,
      posts: posts,
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
    const { id } = await firebase
      .firestore()
      .collection("posts")
      .add({
        title,
        description,
        categoryId,
        location: new firebase.firestore.GeoPoint(
          selectedLocation.lat,
          selectedLocation.long
        ),
        expirationDate: expirationDate.toISOString(),
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
        selectedLocation.lat,
        selectedLocation.long,
        expirationDate
      ),
    });
  };
};
