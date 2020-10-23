import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

import MainNavigator, {
  navigatorOptions as mainNavigatorOptions,
} from "./MainNavigator";
import SettingNavigator, {
  navigatorOptions as settingNavigatorOptions,
} from "./SettingNavigator";
import MyText from "../../components/UI/MyText";

const Drawer = createDrawerNavigator();

const drawerContent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
        <MyText style={styles.title}>Lost & Found</MyText>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          firebase.auth().signOut();
        }}
        icon={({ size, color }) => (
          <Ionicons name="md-log-out" size={size} color={color} />
        )}
      />
    </View>
  );
};

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator drawerContent={drawerContent}>
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={mainNavigatorOptions}
      />
      <Drawer.Screen
        name="SettingNavigator"
        component={SettingNavigator}
        options={settingNavigatorOptions}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 25,
    fontFamily: "kanit-light",
    paddingVertical: 20,
    paddingLeft: 10,
  },
});

export default DrawerNavigator;
