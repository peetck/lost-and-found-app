import React from "react";
import { FlatList } from "react-native";

import PostItem from "./PostItem";

const PostList = (props) => {
  const renderItem = (itemData) => (
    <PostItem title={itemData.item} color="#FFA600" />
  );

  const keyExtractor = (item) => item;

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
    />
  );
};

export default PostList;
