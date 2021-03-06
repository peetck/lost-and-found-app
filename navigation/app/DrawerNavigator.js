import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import i18n from "i18n-js";

import MainNavigator, {
  navigatorOptions as mainNavigatorOptions,
} from "./main/MainNavigator";
import SettingsNavigator, {
  navigatorOptions as settingsNavigatorOptions,
} from "./settings/SettingsNavigator";
import MyText from "../../components/UI/MyText";
import { logout } from "../../store/actions/user";

const Drawer = createDrawerNavigator();

const drawerContentOptions = {
  labelStyle: {
    fontFamily: "kanit-light",
  },
};

const DrawerContent = (props) => {
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
        label={i18n.t("drawerNavigator.logout")}
        labelStyle={styles.label}
        onPress={props.onLogout}
        icon={({ size, color }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
            size={size}
            color={color}
          />
        )}
      />
    </View>
  );
};

const DrawerNavigator = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logout());
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent {...props} onLogout={logoutHandler} />
      )}
      drawerContentOptions={drawerContentOptions}
    >
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={mainNavigatorOptions}
      />
      <Drawer.Screen
        name="SettingsNavigator"
        component={SettingsNavigator}
        options={settingsNavigatorOptions}
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
  label: {
    fontFamily: "kanit-light",
  },
});

export default DrawerNavigator;
