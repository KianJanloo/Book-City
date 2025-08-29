import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Server, Socket } from 'socket.io';
import { Logger } from 'winston';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      this.logger.info(`new message from { ${client.id} }: ${message}`);

      this.server.emit('new_message', message);
    } catch (error) {
      console.log(error);
    }
  }

  handleConnection(client: Socket) {
    console.log(`✅ کاربر وصل شد: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ کاربر خارج شد: ${client.id}`);
  }
}
