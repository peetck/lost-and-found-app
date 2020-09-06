import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsOverviewScreen from "../screens/PostsOverviewScreen";
import PostDetailScreen from "../screens/PostDetailScreen";

const PostStackNavigator = createStackNavigator();

export const PostNavigator = (props) => {
  return (
    <PostStackNavigator.Navigator headerMode="none">
      <PostStackNavigator.Screen
        name="PostsOverview"
        component={PostsOverviewScreen}
      />
      <PostStackNavigator.Screen
        name="PostDetail"
        component={PostDetailScreen}
      />
    </PostStackNavigator.Navigator>
  );
};
