import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Loader from "../../../components/UI/Loader";
import { API_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import MyTextInput from "../../../components/UI/MyTextInput";
import {
  createChatRoom,
  fetchAllChats,
  updateLastMessage,
  updateSeen,
} from "../../../store/actions/chats";
import Bubble from "../../../components/app/main/Bubble";

const ChatScreen = (props) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const idToken = useSelector((state) => state.user.idToken);
  const ws = useSelector((state) => state.user.ws);

  const { toUser, roomId } = props.route.params;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRoom = async () => {
      const response = await fetch(`${API_URL}/chat/room?roomId=${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": idToken,
        },
      });

      const data = await response.json();

      if (!data?.Item?.seen && data?.Item?.last?.fromUid !== uid) {
        // send seen
        await fetch(`${API_URL}/chat/room/seen?roomId=${roomId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": idToken,
          },
        });
        dispatch(updateSeen(roomId));
      }
      setMessages(data.Item.messages.reverse());
      setIsLoading(false);
    };
    loadRoom();
  }, []);

  useEffect(() => {
    ws.onmessage = async (e) => {
      if (e.data) {
        const data = JSON.parse(e.data);
        setMessages((prev) => [data, ...prev]);

        await fetch(`${API_URL}/chat/room/seen?roomId=${roomId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": idToken,
          },
        });
        dispatch(updateSeen(roomId));
        dispatch(
          updateLastMessage({
            roomId: roomId,
            ...data,
          })
        );
      }
    };

    return () => {
      ws.onmessage = async () => {
        await dispatch(fetchAllChats());
      };
    };
  }, [roomId, idToken, ws]);

  const sendMessageHandler = () => {
    if (message.trim() !== "") {
      const messageId = uuidv4();
      const payload = {
        roomId: roomId,
        fromUid: uid,
        toUid: toUser.sub,
        message: message,
        messageId: messageId,
      };

      const currentTime = new Date().toISOString();

      dispatch(
        updateLastMessage({
          roomId: roomId,
          fromUid: payload.fromUid,
          message: payload.message,
          messageId: messageId,
          toUid: payload.toUid,
          on: currentTime,
        })
      );

      setMessage("");

      ws.send(
        JSON.stringify({
          action: "onmessage",
          payload: payload,
        })
      );

      setMessages((prev) => [
        {
          ...payload,
          messageId: messageId,
          on: currentTime,
        },
        ...prev,
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <Loader visible={isLoading} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.messageId}
        inverted
        renderItem={(itemData) => (
          <Bubble
            message={itemData.item.message}
            right={itemData.item.fromUid === uid}
            imageUrl={toUser.picture}
          />
        )}
        style={styles.flatList}
      />
      <MyTextInput
        onChangeText={setMessage}
        value={message}
        onSubmitEditing={sendMessageHandler}
        placeholder="Enter some message"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  flatList: {
    marginBottom: 25,
  },
});

export const screenOptions = (navData) => {
  const { toUser } = navData.route.params;
  return {
    headerTitle: toUser.nickname,
    headerTitleStyle: {
      fontFamily: "kanit-light",
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default ChatScreen;
