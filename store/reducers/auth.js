import { LOGOUT, SET_USER } from "../actions/auth";

const initialState = {
  email: "",
  nickname: "",
  imageUrl: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const userData = action.userData;
      return {
        ...state,
        email: userData.email,
        nickname: userData.nickname,
        imageUrl: userData.imageUrl,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
