import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IPayload } from "src/interface/interface";
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server;

    // constructor(private jwt: JwtService){}

    // private async checkToken (client) {
    //     const user: IPayload = await this.jwt.verify(client.handshake.query.token);
    // }

    handleConnection(client){
        console.log(client)
        client.emit('connection', "Successfully connected to server")
    }

    handleDisconnect(client) {
        client.emit('disconection', "Successfully connected to server")
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string) {
        console.log(message);
        this.server.emit('message', message);
    }
}