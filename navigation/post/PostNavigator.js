import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsOverviewScreen, {
  screenOptions as PostsOverviewScreenOptions,
} from "../../screens/post/PostsOverviewScreen";
import EditPostScreen from "../../screens/post/EditPostScreen";

const PostStackNavigator = createStackNavigator();

const PostNavigator = (props) => {
  return (
    <PostStackNavigator.Navigator>
      <PostStackNavigator.Screen
        name="PostsOverview"
        component={PostsOverviewScreen}
        options={PostsOverviewScreenOptions}
      />
      <PostStackNavigator.Screen
        name="EditPost"
        component={EditPostScreen}
        options={{
          headerShown: true,
        }}
      />
    </PostStackNavigator.Navigator>
  );
};

export default PostNavigator;
