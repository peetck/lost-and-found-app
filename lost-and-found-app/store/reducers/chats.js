import {
  CREATE_CHAT_ROOM,
  SET_CHATS,
  UPDATE_LAST_MESSAGE,
  UPDATE_SEEN,
} from "../actions/chats";

const initialState = {
  chats: [],
};

const setChats = (state, action) => {
  const chats = action.chats;
  return {
    ...state,
    chats: chats,
  };
};

const createChatRoom = (state, action) => {
  return {
    ...state,
    chats: [action.chat, ...state.chats],
  };
};

const updateLastMessage = (state, action) => {
  const payload = action.payload;

  const index = state.chats.findIndex((chat) => chat.roomId === payload.roomId);

  const updatedChats = [...state.chats];

  updatedChats[index] = {
    ...updatedChats[index],
    last: {
      fromUid: payload.fromUid,
      message: payload.message,
      messageId: payload.messageId,
      toUid: payload.toUser,
      on: payload.on,
    },
  };

  return {
    ...state,
    chats: updatedChats,
  };
};

const updateSeen = (state, action) => {
  const roomId = action.roomId;

  const index = state.chats.findIndex((chat) => chat.roomId === roomId);

  const updatedChats = [...state.chats];

  updatedChats[index] = {
    ...updatedChats[index],
    seen: true,
  };

  return {
    ...state,
    chats: updatedChats,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return setChats(state, action);
    case CREATE_CHAT_ROOM:
      return createChatRoom(state, action);
    case UPDATE_LAST_MESSAGE:
      return updateLastMessage(state, action);
    case UPDATE_SEEN:
      return updateSeen(state, action);
    default:
      return state;
  }
};

export default reducer;
