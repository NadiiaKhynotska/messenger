// import {
//   MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
//
// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//
//   private clients: Set<Socket> = new Set();
//
//   @WebSocketServer()
//   public server: Server;
//   afterInit(server: Server) {
//     console.log('WebSocket Gateway initialized');
//   }
//
//   handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     this.clients.add(client);
//   }
//
//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     this.clients.delete(client);
//   }
//
//   @SubscribeMessage('sendMessage')
//   handleMessage(client: Socket, payload: any): void {
//     console.log(`Message from client ${client.id}: ${payload}`);
//     client.emit('reply', 'this is replay')
//   }
//
//
//   @SubscribeMessage('identity')
//   async identity(@MessageBody() data: number): Promise<number> {
//     return data;
//   }
// }
//
//
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

  sendMessageToUser(userId: string, message: any) {
    const recipientSocketId = this.clients.get(userId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('newMessage', message);
      Logger.log(`Message sent to user ${recipientSocketId}`);
    } else {
      Logger.log(`Recipient not connected: ${userId}`);
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
