import { API_URL } from "@env";

import Chat from "../../models/chat";

export const SET_CHATS = "SET_CHATS";
export const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM";
export const UPDATE_LAST_MESSAGE = "UPDATE_LAST_MESSAGE";
export const UPDATE_SEEN = "UPDATE_SEEN";

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

        const roomResponse = await fetch(
          `${API_URL}/chat/room?roomId=${room.M.roomId.S}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": idToken,
            },
          }
        );

        const roomData = await roomResponse.json();

        const chat = new Chat(
          roomData.Item.roomId,
          otherUserData,
          roomData.Item.seen,
          roomData.Item.last
        );

        myChats.push(chat);
      }
    }

    myChats.sort(
      (a, b) => new Date(a.last.on).getTime() < new Date(b.last.on).getTime()
    );

    dispatch({
      type: SET_CHATS,
      chats: myChats,
    });
  };
};

export const createChatRoom = (roomId, toUser) => {
  return async (dispatch, getState) => {
    const uid = getState().user.uid;
    const idToken = getState().user.idToken;

    const response = await fetch(`${API_URL}/chat/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": idToken,
      },
      body: JSON.stringify({
        uid: uid,
        toUser: toUser,
        roomId: roomId,
      }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message);
    }

    const chat = new Chat(data.roomId, toUser, data.seen, data.last);

    dispatch({
      type: CREATE_CHAT_ROOM,
      chat: chat,
    });
  };
};

export const updateLastMessage = (payload) => {
  return {
    type: UPDATE_LAST_MESSAGE,
    payload: payload,
  };
};

export const updateSeen = (roomId) => {
  return {
    type: UPDATE_SEEN,
    roomId: roomId,
  };
};
