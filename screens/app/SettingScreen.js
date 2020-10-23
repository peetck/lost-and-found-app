import React from "react";
import { View, Text, StyleSheet,TouchableOpacity,Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import MyText from "../../components/UI/MyText";

const SettingScreen = (props) => {
  return (
    <View style={styles.screen}>
      <MyText styles={styles.contentHeader}>My info</MyText>
      <View style={styles.contentContainer}>
      <TouchableOpacity
        style={styles.contentBox}
        //onPress={() => {
       //   props.navigation.navigate(""); }}
        activeOpacity={0.6}
      >
        <Ionicons
          name={"md-person"}
          size={20}
          color="black"
          style={styles.contentIcon}
        />
        <MyText style={styles.contentText}>My Profile</MyText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.contentBox}
       // onPress={() => {
       //   props.navigation.navigate("");}}
        activeOpacity={0.6}
      >
        <Ionicons
          name={"md-person"}
          size={20}
          color="black"
          style={styles.contentIcon}
        />
        <MyText style={styles.contentText}>Account</MyText>
      </TouchableOpacity>
    </View >
    
    <View style={{flex:2}}>
    <MyText styles={styles.contentHeader}>App</MyText>
    <TouchableOpacity
        style={styles.contentBox}
        //onPress={() => {
        //  props.navigation.navigate("Search");}}
        activeOpacity={0.6}
      >
        <Ionicons
          name={"person-outline"}
          size={20}
          color="black"
          style={styles.contentIcon}
        />
        <MyText style={styles.contentText}>Search</MyText>
      </TouchableOpacity>

    </View>

    </View>
  );
};

export const screenOptions = (navigationData) => {
  return {
    headerTitle: "Setting",
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          color="black"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  contentHeader: {
    color: "blue"
  },
  contentBox: {
    flexDirection: "row",
    alignItems: "center",

  },contentIcon: {
    padding: 8,
  },
  contentText:{
    
  },
  contentContainer:{
    flex:1

  }
})

export default SettingScreen;
