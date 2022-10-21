import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    namespace: 'wasm-contract',
    cors: {
      origin: '*',
    },
    path: `${process.env.NODE}websocket`,
    transports: 'websocket'
  })
  export class EventsGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('execute')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
}