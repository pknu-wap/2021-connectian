import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { Member, Message, Room } from './chats';

@Injectable()
export class ChatsService {
  private db = database();

  public async getPurposes() {
    const ref = await this.db.ref('/enums/purposes').get();
    return ref.val();
  }

  public async chatsByRoomId(roomId: string) {
    const rootRef = this.db.ref(`/chats/messages/${roomId}`);
    const response = await rootRef.get();
    return response.exists() ? response.val() : {};
  }

  public async createRoom(title: string, purpose: string) {
    const rootRef = this.db.ref();
    const purposeValue = await rootRef.child(`/enums/purpose/${purpose}`).get();
    const date = new Date();
    const room = new Room(
      title,
      purposeValue.val(),
      '',
      date,
      date,
    ).toPrimitive();
    return rootRef.child('/chats/rooms').push(room).key;
  }

  public async addUserToRoom(userId: string, roomId: string, nickname: string) {
    const rootRef = this.db.ref();
    await rootRef.child(`/users/${userId}/chats/rooms/${roomId}`).set(true);
    const member = new Member(
      nickname,
      '#' + Math.round(Math.random() * 0xffffff).toString(16),
    );
    await rootRef.child(`/chats/members/${roomId}/${userId}`).set(member);
  }

  public async getRoomsByUserId(userId: string) {
    const rootRef = await this.db.ref();
    const response = await rootRef.child(`/users/${userId}/chats/rooms`).get();
    const value = response.val();
    return !value
      ? []
      : await Promise.all(
          Object.keys(value).map(async (roomId) => ({
            ...(await rootRef.child(`/chats/rooms/${roomId}`).get()).val(),
            members: (
              await rootRef.child(`/chats/members/${roomId}`).get()
            ).val(),
            roomId,
          })),
        );
  }

  public async pushChat(roomId: string, userId: string, message: string) {
    const rootRef = await this.db.ref();
    rootRef.child(`/chats/rooms/${roomId}/lastMessage`).set(message);
    rootRef
      .child(`/chats/rooms/${roomId}/modifiedAt`)
      .set(new Date().valueOf());
    const messageObj = new Message(userId, message, new Date()).toPrimitive();
    rootRef.child(`/chats/messages/${roomId}`).push(messageObj);
    return messageObj;
  }

  public async setUserInfoByRoomId(
    userId: string,
    roomId: string,
    member: Member,
  ) {
    const ref = this.db.ref(`/chats/members/${roomId}/${userId}`);
    const response = await ref.get();
    if (!response.exists()) return;
    for (const [key, value] of Object.entries(member)) {
      if (member[key] !== null) await ref.child(`/${key}`).set(value);
    }
  }
}
