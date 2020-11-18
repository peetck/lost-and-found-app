import { SET_LANGUAGE } from "../actions/storage";

const initialState = {
  language: null,
};

const setLanguage = (state, action) => {
  return {
    ...state,
    language: action.language,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return setLanguage(state, action);
    default:
      return state;
  }
};

export default reducer;
