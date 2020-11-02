import firebase from "firebase";

import Category from "../../models/category";

export const SET_CATEGORIES = "SET_CATEGORIES";

export const fetchCategories = () => {
  return async (dispatch) => {
    const categories = [];

    const ref = await firebase.firestore().collection("categories").get();

    ref.forEach((category) => {
      const id = category.id;
      const data = category.data();
      categories.push(new Category(id, data.title, data.color));
    });

    categories.sort((a, b) => parseInt(a.id) > parseInt(b.id));

    dispatch({
      type: SET_CATEGORIES,
      categories: categories,
    });
  };
};
