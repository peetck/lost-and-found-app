import { CREATE_POST, SET_MY_POSTS, SET_POSTS } from "../actions/posts";

const initialState = {
  posts: [],
  myPosts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case SET_MY_POSTS:
      return {
        ...state,
        myPosts: action.myPosts,
      };
    case CREATE_POST:
      const post = action.post;
      return {
        ...state,
        myPosts: state.myPosts.concat(post),
      };
    default:
      return state;
  }
};
