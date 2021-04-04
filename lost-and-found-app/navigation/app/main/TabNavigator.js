import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import i18n from "i18n-js";

import HeaderButton from "../../../components/UI/HeaderButton";
import colors from "../../../shared/colors";
import HomeNavigator, {
  navigatorOptions as homeNavigatorOptions,
} from "./HomeNavigator";
import MyPostsNavigator, {
  navigatorOptions as myPostsNavigatorOptions,
} from "./MyPostsNavigator";
import ChatNavigator, {
  navigatorOptions as chatNavigatorOptions,
} from "./ChatNavigator";

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: colors.primary,
  inactiveTintColor: colors.grey,
  tabStyle: {
    paddingTop: 5,
    paddingBottom: 0,
  },
  showIcon: true,
  iconStyle: {
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 11,
    fontFamily: "kanit-light",
  },
  indicatorStyle: {
    backgroundColor: "transparent",
  },
};

const TabNavigator = (props) => {
  return (
    <Tab.Navigator tabBarPosition="bottom" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={homeNavigatorOptions}
      />
      <Tab.Screen
        name="MyPostsNavigator"
        component={MyPostsNavigator}
        options={myPostsNavigatorOptions}
      />
      <Tab.Screen
        name="ChatNavigator"
        component={ChatNavigator}
        options={chatNavigatorOptions}
      />
    </Tab.Navigator>
  );
};

export const navigatorOptions = (navData) => {
  return {
    headerTitle: i18n.t("tabNavigator.headerTitle"),
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          color="black"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-add"
          color="black"
          onPress={() => {
            navData.navigation.navigate("CreatePost");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default TabNavigator;
