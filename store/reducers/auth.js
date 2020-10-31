import { SET_USER } from "../actions/auth";

const initialState = {
  email: "",
  nickname: "",
  imageUrl: "",
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
    default:
      return state;
  }
};
