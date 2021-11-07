import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ChatsService } from '../chats/chats.service';
import { Socket } from 'socket.io';

@Injectable()
export class EventsService {
  constructor(
    private usersService: UsersService,
    private chatsService: ChatsService,
    private jwtService: JwtService,
  ) {}

  public async sign(userId: string) {
    const user = await this.usersService.findById(userId);
    const payload = { sub: userId, username: user.email };
    return this.jwtService.sign(payload);
  }

  public async verify(token: string) {
    return this.jwtService.verify(token);
  }

  public async getUserId(token: string) {
    const response = this.jwtService.verify(token);
    return response.sub;
  }

  public async joinRoom(client: Socket, data: any) {
    const userId = await this.getUserId(client.handshake.auth.access_token);
    if (await this.usersService.isUserInRoomByUserId(userId, data)) {
      client.join(data);
    }
  }

  public async pushChat(client: Socket, data: any) {
    const userId = await this.getUserId(client.handshake.auth.access_token);
    const message = await this.chatsService.pushChat(
      data.roomId,
      userId,
      data.message,
    );
    client.to(data.roomId).emit('pushChat', message);
  }
}
