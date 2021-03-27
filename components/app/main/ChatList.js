import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ChatItem from "./ChatItem";
import MyText from "../../UI/MyText";
import colors from "../../../shared/colors";

const ChatList = (props) => {
  const emptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name={
          Platform.OS === "android" ? "md-close-circle" : "ios-close-circle"
        }
        color="black"
        size={80}
      />
      <MyText style={styles.text}>ไม่มีแชท</MyText>
    </View>
  );

  const renderItem = (itemData) => (
    <ChatItem
      title={itemData.item.title}
      subtitle={itemData.item.subtitle}
      imageUrl={itemData.item.imageUrl}
      onPress={() => {
        props.navigation.navigate("Chat");
      }}
    />
  );

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={props.header}
      onRefresh={props.onRefresh}
      refreshing={props.refreshing}
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

export default ChatList;
