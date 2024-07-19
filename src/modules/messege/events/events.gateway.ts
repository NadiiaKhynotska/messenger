import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ResponseMessageDto } from '../models/dto/response/response-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  readonly clients: Map<string, string> = new Map();

  @WebSocketServer()
  public server: Server;

  afterInit(server: Server) {
    Logger.log(`WebSocket Gateway initialized on ${server}`);
  }

  handleConnection(client: Socket) {
    Logger.log(`Client connected: ${client.id}`);
    client.on('register', (userId: string) => {
      this.clients.set(userId, client.id);
      client.data.userId = userId;
      Logger.log(`Registered user ${userId} with socket id ${client.id}`);
    });
  }

  handleDisconnect(client: Socket) {
    Logger.log(`Client disconnected: ${client.id}`);
    if (client.data.userId) {
      this.clients.delete(client.data.userId);
      Logger.log(`Unregistered user ${client.data.userId}`);
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: any): void {
    Logger.log(`Message from client ${client.id}: ${payload}`);
    const recipientSocketId = this.clients.get(payload.recipientId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('newMessage', payload);
      Logger.log(`Message sent to ${recipientSocketId}`);
    } else {
      Logger.log(`Recipient not connected: ${payload.recipientId}`);
    }
  }

  sendMessageToUser(userId: string, message: ResponseMessageDto) {
    const recipientSocketId = this.clients.get(userId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('newMessage', message);
      Logger.log(`Message sent to user ${recipientSocketId}`);
    } else {
      Logger.log(`Recipient not connected: ${userId}`);
    }
  }

  sendUpdateToUser(userId: string, message: ResponseMessageDto) {
    const recipientSocketId = this.clients.get(userId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('updateMessage', message);
      Logger.log(`Update sent to ${recipientSocketId}`);
    } else {
      Logger.log(`Recipient not connected: ${userId}`);
    }
  }

  sendDeleteToUser(userId: string, messageId: string) {
    const recipientSocketId = this.clients.get(userId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('deleteMessage', messageId);
      Logger.log(`Delete sent to ${recipientSocketId}`);
    } else {
      Logger.log(`Recipient not connected: ${userId}`);
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
