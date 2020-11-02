import { SET_CATEGORIES } from "../actions/categories";

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      const categories = action.categories;
      return {
        ...state,
        categories,
      };
    default:
      return state;
  }
};
