import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import Loader from "../../../components/UI/Loader";
import { API_URL } from "@env";
import i18n from "i18n-js";
import { useSelector, useDispatch } from "react-redux";

import colors from "../../../shared/colors";
import MyTextInput from "../../../components/UI/MyTextInput";
import { createChat } from "../../../store/actions/chats";

const Bubble = (props) => {
  return (
    <View
      style={
        props.right ? { alignItems: "flex-end" } : { alignItems: "flex-start" }
      }
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {!props.right && (
          <Image
            source={{
              uri: props.imageUrl,
            }}
            style={{
              width: 45,
              height: 45,
              marginRight: 10,
            }}
          />
        )}

        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>{props.message}</Text>
        </View>
      </View>
    </View>
  );
};

const ChatScreen = (props) => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.chats);
  const uid = useSelector((state) => state.user.uid);
  const idToken = useSelector((state) => state.user.idToken);
  const ws = useSelector((state) => state.user.ws);

  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState();
  const [message, setMessage] = useState("");

  const { toUser } = props.route.params;

  console.log(messages);

  const sendMessageHandler = () => {
    ws.send(
      JSON.stringify({
        action: "onmessage",
        payload: {
          id: chat.id.S,
          uid: uid,
          to: toUser.sub,
          message: message,
        },
      })
    );

    setMessage("");
  };

  useEffect(() => {
    const init = async () => {
      let found = false;

      for (let chatObj of chats) {
        if (toUser.sub === chatObj.toUser.sub) {
          found = true;
          setChat(chatObj);
          return;
        }
      }
      if (!found) {
        await dispatch(createChat(toUser));
      }
    };

    init();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (!chat) {
        return;
      }
      const response = await fetch(`${API_URL}/messages?id=${chat.id.S}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": idToken,
        },
      });

      const data = await response.json();

      setMessages(data.Item.messages);
    };
    loadMessages();
  }, [chat]);

  return (
    <View style={styles.screen}>
      <ScrollView>
        {messages.map((i) => (
          <Bubble
            key={i.id}
            message={i.message}
            right={i.uid === uid}
            imageUrl={toUser.picture}
          />
        ))}
      </ScrollView>
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

  bubble: {
    backgroundColor: colors.primary,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 0,
    borderRadius: 50,
  },
  bubbleText: {
    color: "white",
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
