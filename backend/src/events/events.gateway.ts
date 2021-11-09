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

@WebSocketGateway()
export class EventsGateway {
  constructor(private eventsService: EventsService) {}

  @SubscribeMessage('pushChat')
  public async pushChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: PushChatRequestDto,
  ) {
    await this.eventsService.pushChat(client, data);
  }

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
