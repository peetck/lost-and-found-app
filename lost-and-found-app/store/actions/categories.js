import { API_URL } from "@env";

import Category from "../../models/category";

export const SET_CATEGORIES = "SET_CATEGORIES";

export const fetchCategories = () => {
  return async (dispatch) => {
    const categories = [];

    const response = await fetch(`${API_URL}/categories`);

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
