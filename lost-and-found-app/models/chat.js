class Chat {
  constructor(roomId, toUser, seen, last, messages) {
    this.roomId = roomId;
    this.toUser = toUser;
    this.seen = seen;
    this.last = last;
  }
}

export default Chat;
