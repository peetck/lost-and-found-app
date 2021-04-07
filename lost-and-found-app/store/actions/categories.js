import firebase from "firebase";

import Category from "../../models/category";

export const SET_CATEGORIES = "SET_CATEGORIES";

export const fetchCategories = () => {
  return async (dispatch) => {
    const categories = [];

    const response = await fetch(
      "https://yldoibdrk8.execute-api.ap-southeast-1.amazonaws.com/development/categories"
    );

    const data = await response.json();

    data.Items.forEach((category) => {
      const title = {
        th: category.title.M.th.S,
        en: category.title.M.en.S,
      };
      categories.push(new Category(category.id.S, title, category.color.S));
    });

    categories.sort((a, b) => parseInt(a.id) > parseInt(b.id));

    dispatch({
      type: SET_CATEGORIES,
      categories: categories,
    });
  };
};
