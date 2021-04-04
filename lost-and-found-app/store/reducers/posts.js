import { CREATE_POST, SET_MY_POSTS, SET_POSTS } from "../actions/posts";

const initialState = {
  posts: [],
  myPosts: [],
};

const setPosts = (state, action) => {
  const posts = action.posts;
  posts.sort((postA, postB) => postA.distance - postB.distance);
  return {
    ...state,
    posts: posts,
  };
};

const setMyPosts = (state, action) => {
  const myPosts = action.myPosts;
  myPosts.sort((postA, postB) => postA.distance - postB.distance);
  return {
    ...state,
    myPosts: myPosts,
  };
};

const createPost = (state, action) => {
  const post = action.post;
  const updatedMyPosts = [post, ...state.myPosts];
  updatedMyPosts.sort((postA, postB) => postA.distance - postB.distance);
  return {
    ...state,
    myPosts: updatedMyPosts,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return setPosts(state, action);
    case SET_MY_POSTS:
      return setMyPosts(state, action);
    case CREATE_POST:
      return createPost(state, action);
    default:
      return state;
  }
};

export default reducer;
