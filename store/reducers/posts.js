import { CREATE_POST, SET_POSTS } from "../actions/posts";

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case CREATE_POST:
      const post = action.post;
      return {
        ...state,
        posts: state.posts.concat(post),
      };
    default:
      return state;
  }
};
