import { Alert } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export const takeImage = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );
  if (status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant camera permissions to use this app.",
      [{ text: "Okay" }]
    );
    return;
  } else {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    return image.uri;
  }
};

export const getCurrentPosition = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant location permissions to use this app.",
      [{ text: "Okay" }]
    );
    return;
  } else {
    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      return {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      };
    } catch (err) {
      Alert.alert("Could not fetch location!", "Please try again later.", [
        { text: "Okay" },
      ]);
    }
  }
};
