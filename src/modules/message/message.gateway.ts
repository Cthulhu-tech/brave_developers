import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IPayload, RoomMessage, UserMessage, UserRoom } from "src/interface/interface";
import { Room } from "../room/entities/room.entity";
import { Message } from "./entities/message.entity";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server;

    constructor(private jwt: JwtService) { }
    private async check(client) {
        try {
            return await this.jwt.verify(client.handshake.auth.jwt)
        } catch {
            client.emit('disconection', 'please try again, you jwt will be rejected')
            return null
        }
    }
    private async checkRoom (message: RoomMessage | UserMessage) {
        return await Room    
        .createQueryBuilder()
        .leftJoinAndSelect("Room.user_created", "User")
        .select(["Room.id as id"])
        .where("Room.id = :id", {id: message.id})
        .getRawMany()
    }
    async handleConnection(client) {
        const user:IPayload = await this.check(client)
        if (!user) return client.disconnect()
        client.emit('connection', "Successfully connected to server")
    }
    handleDisconnect(client) {
        client.emit('disconection', "Successfully disconection to server")
    }
    @SubscribeMessage('messageRoomSet')
    async handleMessage(client, message: UserMessage) {

        const user:IPayload = await this.check(client)
        if(!user) return client.disconnect()
        const roomId = await this.checkRoom(message)
        if(roomId.length === 0) return client.emit('error', {message: "this room not found"})

        const insert = await Message
        .createQueryBuilder()
        .insert()
        .into(Message)
        .values({message: message.msg, room_id: +message.id, user_id: user.sub})
        .execute()

        this.server.to(message.id).emit('messageRoomGet', {id: insert.raw[0].id, user: user.login, message: message.msg})
    }
    @SubscribeMessage('getAllMessage')
    async getAllMessage(client, message: RoomMessage) {
        const roomId = await this.checkRoom(message)
        if(roomId.length === 0) return client.emit('error', {message: "this room not found"})
        const messageRoom = await Message
        .createQueryBuilder()
        .leftJoinAndSelect("Message.room_id", "Room")
        .leftJoinAndSelect("Message.user_id", "User")
        .select(["Message.id as id", "Message.message as message", "User.login as user"])
        .where("Room.id = :id", {id: message.id})
        .getRawMany()
        client.emit('setAllMessage', {roomMessage: messageRoom})
    }
    @SubscribeMessage('joinRoom')
    joinRoom(client, message: UserRoom) {
        client.join(message.id)
        client.emit('join', message.username)
    }
    @SubscribeMessage('leaveRoom')
    leaveRoom(client, message: UserRoom) {
        client.leave(message.id)
        client.emit('leave', message.username)
    }
}