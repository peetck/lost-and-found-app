import { SET_POSTS } from "../actions/posts";

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
    default:
      return state;
  }
};
