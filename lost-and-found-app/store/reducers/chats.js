import { CREATE_CHAT, SET_CHATS } from "../actions/chats";

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

const createChat = (state, action) => {
  return {
    ...state,
    chats: [action.chat, ...state.chats],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return setChats(state, action);
    case CREATE_CHAT:
      return createChat(state, action);
    default:
      return state;
  }
};

export default reducer;
