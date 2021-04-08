import {
  RESET,
  SET_IMAGE_URL,
  SET_LOCATION,
  SET_NICKNAME,
  SET_USER,
} from "../actions/user";

const initialState = {
  email: "",
  nickname: "",
  imageUrl: null,
  location: null,
  idToken: "",
  uid: "",
  refreshToken: "",
};

const setUser = (state, action) => {
  const userData = action.userData;
  return {
    ...state,
    email: userData.email,
    nickname: userData.nickname,
    imageUrl: userData.imageUrl,
    idToken: userData.idToken,
    uid: userData.uid,
    refreshToken: userData.refreshToken,
  };
};

const setLocation = (state, action) => {
  return {
    ...state,
    location: action.location,
  };
};

const setNickname = (state, action) => {
  return {
    ...state,
    nickname: action.nickname,
  };
};

const setImageUrl = (state, action) => {
  return {
    ...state,
    imageUrl: action.imageUrl,
  };
};

const reset = (state, action) => {
  return {
    ...state,
    email: "",
    nickname: "",
    imageUrl: null,
    idToken: "",
    uid: "",
    refreshToken: "",
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action);
    case SET_LOCATION:
      return setLocation(state, action);
    case SET_NICKNAME:
      return setNickname(state, action);
    case SET_IMAGE_URL:
      return setImageUrl(state, action);
    case RESET:
      return reset(state, action);
    default:
      return state;
  }
};

export default reducer;
