import { API_URL } from "@env";

import Chat from "../../models/chat";

export const SET_CHATS = "SET_CHATS";
export const CREATE_CHAT = "CREATE_CHAT";

export const fetchAllChats = () => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;
    const idToken = getState().user.idToken;

    const response = await fetch(`${API_URL}/user/chats?uid=${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": idToken,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    const myChats = [];

    if (data?.Item?.rooms?.L) {
      for (const room of data?.Item?.rooms?.L) {
        const otherUserUid = room.M.uid.S;

        const otherUserResponse = await fetch(
          `${API_URL}/user?uid=${otherUserUid}`
        );

        const otherUserData = await otherUserResponse.json();

        if (otherUserResponse.status !== 200) {
          throw new Error(otherUserData.message);
        }

        const chat = new Chat(room.M.id, otherUserData);
        myChats.push(chat);
      }
    }

    dispatch({
      type: SET_CHATS,
      chats: myChats,
    });
  };
};

export const createChat = (toUser) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;
    const idToken = getState().user.idToken;

    const response = await fetch(`${API_URL}/user/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": idToken,
      },
      body: JSON.stringify({
        uid: uid,
        toUser: toUser,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    const chat = new Chat(data.id, toUser);

    dispatch({
      type: CREATE_CHAT,
      chat: chat,
    });
  };
};
