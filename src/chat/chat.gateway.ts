import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    client.emit('connected', `${client.id} connected`);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    client.emit('disconnected', `${client.id} disconnected`);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @MessageBody() { room }: { room: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      await client.join(room);
      client.emit('joined', `You entered ${room} room`);
      console.log(`You entered ${room} room`);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  }

  @SubscribeMessage('messageToRoom')
  sendToRoom(
    @MessageBody() { room, message }: { room: string; message: string },
  ): void {
    try {
      this.server.to(room).emit('message', message);
      console.log(`message: ${message} to ${room} room`);
    } catch (error) {
      console.error('Error sending message to room:', error);
    }
  }

  @SubscribeMessage('privateMessage')
  sendPrivate(
    @MessageBody() { to, message }: { to: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    try {
      this.server.to(to).emit('private', { from: client.id, message });
      console.log(`message: ${message} to ${to}`);
    } catch (error) {
      console.error('Error sending private message:', error);
    }
  }
}
