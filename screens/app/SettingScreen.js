import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import MyText from "../../components/UI/MyText";

const SettingScreen = (props) => {
  return (
    <View style={styles.screen}>
      <MyText style={{ color: "#0084ff", paddingTop: 15, fontSize: 13, fontFamily: "kanit-bold" }}>My Profile</MyText>
      <View style={[styles.contentContainer,{flex: 1}]}>

        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
          onPress={() => {
             props.navigation.navigate("MyProfile"); }}
=======
          //onPress={() => {
          //   props.navigation.navigate(""); }}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"ios-person"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={[styles.contentText]}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
           onPress={() => {
             props.navigation.navigate("MyAccount");}}
=======
          // onPress={() => {
          //   props.navigation.navigate("");}}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"md-clipboard"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={styles.contentText}>Account</Text>
        </TouchableOpacity>
      </View >

      <View style={[styles.contentContainer,{flex:1.7,paddingTop:25}]}>
        <MyText style={{ color: "#0084ff", fontSize: 13, fontFamily: "kanit-bold" }}>App</MyText>
        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
          onPress={() => {
            props.navigation.navigate("SettingNotification");}}
=======
          //onPress={() => {
          //  props.navigation.navigate("Search");}}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"ios-notifications"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={styles.contentText}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
          onPress={() => {
            props.navigation.navigate("SettingTheme");}}
=======
          //onPress={() => {
          //  props.navigation.navigate("Search");}}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"ios-color-palette"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={styles.contentText}>Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
          onPress={() => {
            props.navigation.navigate("SettingLanguages");}}
=======
          //onPress={() => {
          //  props.navigation.navigate("Search");}}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"ios-flag"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={styles.contentText}>Languages</Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 4,paddingTop:25 }}>
        <MyText style={{ color: "#0084ff", fontSize: 13, fontFamily: "kanit-bold" }}>Lost & Found info</MyText>

        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
          onPress={() => {
            props.navigation.navigate("Help");}}
=======
          //onPress={() => {
          //  props.navigation.navigate("Search");}}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"ios-help-circle-outline"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={styles.contentText}>Help Center</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contentBox}
<<<<<<< HEAD
          onPress={() => {
            props.navigation.navigate("About");}}
=======
          //onPress={() => {
          //  props.navigation.navigate("Search");}}
>>>>>>> 5c0e77c2e8e7a768fa174cec2cff49c4edac12fe
          activeOpacity={0.6}
        >
          <Ionicons
            name={"ios-information-circle-outline"}
            size={25}
            color="black"
            style={styles.contentIcon}
          />
          <Text style={styles.contentText}>About Lost & Found</Text>
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

  contentBox: {
    flexDirection: "row",
    alignItems: "center",


  }, contentIcon: {
    padding: 8,
  },
  contentText: {
    paddingLeft: 10, fontSize: 15

  },
  contentContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5

  }
})

export default SettingScreen;
