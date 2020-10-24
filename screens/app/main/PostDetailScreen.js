import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const PostDetailScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.framePicture}>
        <View style={styles.picture}>{/* ใส่รูปภาพ */}</View>
      </View>
      <View style={styles.frameContent}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type...
        </Text>
      </View>
      <View style={styles.frameMap}>
        <View style={styles.map}>{/* ใส่ google map */}</View>
      </View>
      <View style={styles.frameContent}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  framePicture: {
    backgroundColor: "white",
    flex: 2,
    alignItems: "center",
  },
  picture: {
    backgroundColor: "#efbbcf",
    width: "90%",
    height: "85%",
    marginTop: "5%",
  },
  frameContent: {
    backgroundColor: "white",
    flex: 1,
    padding: "5%",
  },
  frameMap: {
    backgroundColor: "white",
    flex: 2,
    alignItems: "center",
  },
  map: {
    width: "65%",
    height: "95%",
    backgroundColor: "#efbbcf",
  },
});

export const screenOptions = {
  headerTitle: "Dummy Post detail",
  headerTitleStyle: {
    fontFamily: "kanit-light",
  },
};

export default PostDetailScreen;
