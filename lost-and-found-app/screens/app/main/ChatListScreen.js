import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import colors from "../../../shared/colors";
import ChatList from "../../../components/app/main/ChatList";
import { fetchAllChats } from "../../../store/actions/chats";
import { showError } from "../../../shared/utils";

const ChatListScreen = (props) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const chats = useSelector((state) => state.chats.chats);
  const uid = useSelector((state) => state.user.uid);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadChats = useCallback(async () => {
    try {
      await dispatch(fetchAllChats(uid));
    } catch (error) {
      showError(error.message);
    }
  }, [dispatch, uid]);

  useEffect(() => {
    loadChats();
  }, [loadChats, isFocused]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadChats();
    setIsRefreshing(false);
  };

  const header = (
    <TouchableOpacity style={styles.searchContainer} activeOpacity={0.6}>
      <Ionicons
        name={Platform.OS === "android" ? "md-search" : "ios-search"}
        size={20}
        color="black"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Name"
        value={searchInput}
        onChangeText={setSearchInput}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <ChatList
        data={chats.filter((chat) =>
          chat.toUser.nickname
            .toLowerCase()
            .trim()
            .includes(searchInput.toLowerCase().trim())
        )}
        navigation={props.navigation}
        header={header}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
    fontSize: 16,
    paddingLeft: 10,
  },
});

export const screenOptions = {
  headerShown: false,
};

export default ChatListScreen;
