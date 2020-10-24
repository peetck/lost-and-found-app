import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PostList from "../../../components/app/main/PostList";

const MyPostScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>MyPost SCREEN</Text>

      <View style={{flex: 0.5}}>
        <PostList
          data={[
            { id: "1", title: "Sushi 1", color: "#003F5C" },
            { id: "2", title: "Sushi 2", color: "#955196" },
            { id: "3", title: "Sushi 3", color: "#FF6E54" },
            { id: "4", title: "Sushi 4", color: "#444E86" },
            { id: "5", title: "Sushi 5", color: "#DD5182" },
            { id: "6", title: "Sushi 6", color: "#FFA600" },
            { id: "7", title: "Sushi 1", color: "#003F5C" },
            { id: "8", title: "Sushi 1", color: "#003F5C" },
          ]}
          navigation={props.navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
});

export const screenOptions = {
  headerTitle: "My Post",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default MyPostScreen;
