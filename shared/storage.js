import i18n from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadLanguageSetting = async () => {
  const language = await AsyncStorage.getItem("language");
  if (language !== null) {
    i18n.locale = language;
  } else {
    await saveLanguageSetting("en");
  }
};

export const saveLanguageSetting = async (language) => {
  await AsyncStorage.setItem("language", language);
  i18n.locale = language;
};
