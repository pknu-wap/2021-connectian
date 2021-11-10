import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { EventsGuard } from './events.guard';
import { EventsService } from './events.service';
import { PushChatRequestDto } from './event.class';
import { AsyncApiPub, AsyncApiService, AsyncApiSub } from 'nestjs-asyncapi';
import { Message } from '../chats/chats';

@WebSocketGateway()
@AsyncApiService({
  serviceName: 'events',
})
export class EventsGateway {
  constructor(private eventsService: EventsService) {}

  @SubscribeMessage('pushChat')
  @AsyncApiPub({
    summary: 'push chat to server',
    channel: 'pushChat',
    message: {
      name: 'PushChatRequestDto',
      payload: {
        type: PushChatRequestDto,
      },
    },
  })
  @AsyncApiSub({
    summary: 'get chat from server',
    channel: 'pushChat',
    description:
      'createdAt는 timestamp number로 옵니다. new Date()로 파싱해 주세요.',
    message: {
      name: 'PushChatResponseDto',
      payload: {
        type: Message,
      },
    },
  })
  public async pushChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PushChatRequestDto,
  ) {
    await this.eventsService.pushChat(client, data);
  }

  @AsyncApiPub({
    summary: 'join room to chat',
    channel: 'joinRoom',
    description: 'roomId만 string으로 보내주세요. object 말고 string만',
    message: {
      name: 'roomId',
      payload: {
        type: String,
      },
    },
  })
  @SubscribeMessage('joinRoom')
  @UseGuards(EventsGuard)
  public async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: string,
  ) {
    await this.eventsService.joinRoom(client, data);
  }

  // handleConnection, handleDisconnection
}
