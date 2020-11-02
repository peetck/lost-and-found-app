import React from "react";
import { FlatList, StyleSheet } from "react-native";

import PostItem from "./PostItem";

const PostList = (props) => {
  const renderItem = (itemData) => (
    <PostItem
      title={itemData.item.title}
      categoryId={itemData.item.categoryId}
      imageUrl={itemData.item.imageUrl}
      expirationDate={itemData.item.expirationDate}
      distance={itemData.item.distance}
      onPress={() => {
        props.navigation.navigate("PostDetail", {
          postId: itemData.item.id,
          title: itemData.item.title,
        });
      }}
    />
  );

  const keyExtractor = (item) => item.id;

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      ListHeaderComponent={props.header}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
      style={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "white",
  },
});

export default PostList;
