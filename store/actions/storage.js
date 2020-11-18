import i18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SET_LANGUAGE = "SET_LANGUAGE";

const setLanguage = (language) => {
  i18n.locale = language;
  return {
    type: SET_LANGUAGE,
    language: language,
  };
};

export const saveLanguageSetting = (language) => {
  return async (dispatch) => {
    await AsyncStorage.setItem("language", language);
    dispatch(setLanguage(language));
  };
};

export const loadLanguageSetting = () => {
  return async (dispatch) => {
    const language = await AsyncStorage.getItem("language");
    if (language !== null) {
      // already have language setting.
      dispatch(setLanguage(language));
    } else {
      dispatch(saveLanguageSetting("en"));
    }
  };
};
