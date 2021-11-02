import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @SubscribeMessage('chat')
  public pushChat(client: Socket, data) {
    client.to('testchatroom').emit('chat', {
      client: client.id,
      data,
    });
  }

  @SubscribeMessage('whisper')
  public pushWhisper(client: Socket, data) {
    console.log({
      client: client.id,
      data,
    });
  }

  // handleConnection, handleDisconnection
}
