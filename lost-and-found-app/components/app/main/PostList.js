import React from "react";
import { FlatList, StyleSheet, View, Platform } from "react-native";
import i18n from "i18n-js";

import PostItem from "./PostItem";
import MyText from "../../UI/MyText";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../../shared/colors";

const PostList = (props) => {
  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name={
          Platform.OS === "android" ? "md-close-circle" : "ios-close-circle"
        }
        color="black"
        size={80}
      />
      <MyText style={styles.text}>{i18n.t("postList.emptyText")}</MyText>
    </View>
  );

  const renderItem = (itemData) => (
    <PostItem
      title={itemData.item.title}
      categoryId={itemData.item.categoryId}
      imageUrl={itemData.item.imageUrl}
      expirationDate={itemData.item.expirationDate}
      distance={itemData.item.distance}
      onPress={() => {
        props.navigation.navigate("PostDetail", {
          categoryId: itemData.item.categoryId,
          title: itemData.item.title,
          description: itemData.item.description,
          imageUrl: itemData.item.imageUrl,
          mapUrl: itemData.item.mapUrl,
          location: {
            lat: itemData.item.lat,
            lng: itemData.item.lng,
          },
          address: itemData.item.address,
        });
      }}
    />
  );

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      ListHeaderComponent={props.header}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
      style={styles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={emptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "white",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 45,
    marginHorizontal: 10,
    backgroundColor: colors.lightGrey,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
  },
});

export default PostList;
