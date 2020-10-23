import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

const SettingScreen = (props) => {
  return (
    <View>
      <Text>Setting Screen</Text>
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

export default SettingScreen;
