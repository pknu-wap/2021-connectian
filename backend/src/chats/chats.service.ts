import { Injectable } from '@nestjs/common';
import { database } from 'firebase-admin';
import { Member, Message, Room } from './chats';
import { CreatedPurposeEnum } from './chat.enum';

@Injectable()
export class ChatsService {
  private db = database();

  public async chatsByRoomId(roomId: string) {
    const rootRef = this.db.ref(`/chats/messages/${roomId}`);
    const response = await rootRef.get();
    return response.val();
  }

  public async createRoom(title: string, createdPurpose: CreatedPurposeEnum) {
    const rootRef = this.db.ref('/chats/rooms');
    const date = new Date();
    const room = new Room(title, createdPurpose, '', date, date).toPrimitive();
    return rootRef.push(room).key;
  }

  public async addUserToRoom(userId: string, roomId: string) {
    const rootRef = this.db.ref();
    await rootRef.child(`/users/${userId}/chats/rooms/${roomId}`).set(true);
    const member = new Member(
      '춤추는 라이언',
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
}
