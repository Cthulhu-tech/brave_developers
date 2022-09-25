import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer()
    server;

    constructor(private jwt: JwtService) { }

    private async check(client) {
        try {

            return await this.jwt.verify(client.handshake.query.token)
        } catch {

            client.emit('jwt error', 'please try again, you jwt will be rejected')

            return null
        }
    }

    async handleConnection(client) {

        const user = await this.check(client)
        if (!user) return client.disconnect()
        
        client.emit('connection', "Successfully connected to server")
    }

    handleDisconnect(client) {
        client.emit('disconection', "Successfully connected to server")
    }

    @SubscribeMessage('message')
    handleMessage(client, message) {

        const user = this.check(client)
        if(!user) return client.disconnect() 

        this.server.emit('message', message);
    }
}