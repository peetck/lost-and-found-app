import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

const PostDetailScreen = (props) => {
  const { description, imageUrl, mapUrl, location } = props.route.params;

  const pressLocationHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: {
        lat: location.lat,
        lng: location.lng,
      },
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>

      <View style={styles.descriptionContainer}>
        <Text>{description}</Text>
      </View>

      <TouchableOpacity
        style={styles.imageContainer}
        activeOpacity={0.6}
        onPress={pressLocationHandler}
      >
        <Image style={styles.image} source={{ uri: mapUrl }} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {},
});

export const screenOptions = (navData) => {
  const { title } = navData.route.params;
  return {
    headerTitle: title,
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default PostDetailScreen;
