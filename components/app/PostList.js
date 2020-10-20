import React from "react";
import { FlatList } from "react-native";

import PostItem from "./PostItem";

const PostList = (props) => {
  const renderItem = (itemData) => (
    <PostItem title={itemData.item.title} color={itemData.item.color} />
  );

  const keyExtractor = (item) => item.id;

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
    />
  );
};

export default PostList;
