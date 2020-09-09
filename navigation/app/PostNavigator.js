import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsOverviewScreen from "../../screens/app/PostsOverviewScreen";
import PostDetailScreen from "../../screens/app/PostDetailScreen";

const PostStackNavigator = createStackNavigator();

const PostNavigator = (props) => {
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

export default PostNavigator;
