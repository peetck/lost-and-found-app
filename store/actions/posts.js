import firebase from "firebase";
import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";

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
          data.location.long
        )
      );
    });

    dispatch({
      type: SET_POSTS,
      posts: posts,
    });
  };
};
