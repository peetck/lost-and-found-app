import { SET_CATEGORIES } from "../actions/categories";

const initialState = {
  categories: [],
};

const setCategories = (state, action) => {
  const categories = action.categories;
  return {
    ...state,
    categories: categories,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return setCategories(state, action);
    default:
      return state;
  }
};

export default reducer;
