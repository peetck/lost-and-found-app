import React from "react";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Post from "../../models/post";
import MyText from "../../components/UI/MyText";
import HeaderButton from "../../components/UI/HeaderButton";

const PostsOverviewScreen = (props) => {
  const DUMMY_DATA = [
    new Post("1", "title1", "desc1", 10.5),
    new Post("2", "title2", "desc1", 10.5),
    new Post("3", "title3", "desc1", 10.5),
  ];

  return (
    <View style={styles.screen}>
      <View
        style={{
          borderWidth: 1,
          padding: 15,
          borderRadius: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <MyText style={{ fontSize: 25 }}>รองเท้าผ้าใบสีดํา</MyText>
          <MyText>รางวัล : 10.5$</MyText>
          <MyText>สถานที่: xxxxxxx/xxx/x/x/x/x/</MyText>
        </View>
        <ImageBackground
          style={{ width: 100, height: "100%" }}
          source={{
            uri:
              "https://assets.adidas.com/images/h_320,f_auto,q_auto:sensitive,fl_lossy/449c838942da409f8ba9a97f00d3cffe_9366/Runfalcon_Shoes_Black_F36199_01_standard.jpg",
          }}
        />
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Post",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Logout"
          iconName="md-log-out"
          onPress={() => {
            // navData.navigation.navigate("");
            firebase.auth().signOut();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
});

export default PostsOverviewScreen;
