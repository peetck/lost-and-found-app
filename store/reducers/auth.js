import { LOGOUT, SET_USER } from "../actions/auth";

const initialState = {
  email: "",
  nickname: "",
  imageUrl: null,
};

const setUser = (state, action) => {
  const userData = action.userData;
  return {
    ...state,
    email: userData.email,
    nickname: userData.nickname,
    imageUrl: userData.imageUrl,
  };
};

const logout = (state, action) => {
  return {
    ...initialState,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action);
    case LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
