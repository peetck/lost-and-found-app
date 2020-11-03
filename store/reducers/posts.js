import { CREATE_POST, SET_MY_POSTS, SET_POSTS } from "../actions/posts";

const initialState = {
  posts: [],
  myPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      const posts = action.posts;
      posts.sort((postA, postB) => postA.distance - postB.distance);
      return {
        ...state,
        posts: posts,
      };
    case SET_MY_POSTS:
      const myPosts = action.myPosts;
      myPosts.sort((postA, postB) => postA.distance - postB.distance);
      return {
        ...state,
        myPosts: myPosts,
      };
    case CREATE_POST:
      const post = action.post;
      const updatedMyPosts = [post, ...state.myPosts];
      updatedMyPosts.sort((postA, postB) => postA.distance - postB.distance);
      return {
        ...state,
        myPosts: updatedMyPosts,
      };
    default:
      return state;
  }
};
