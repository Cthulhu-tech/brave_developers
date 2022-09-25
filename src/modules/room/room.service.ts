import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../user/entities/user.entity';
import { IPayload } from '../../interface/interface'
import { Room } from './entities/room.entity';
import { Request } from 'express';

@Injectable()
@WebSocketGateway()
export class RoomService {

  @WebSocketServer()
  server;

  async create(createRoomDto: CreateRoomDto) {

    const user = await User.findOne({where: {login: createRoomDto.login}})
    await Room.create({name: createRoomDto.name, user_created: user}).save()

    this.server.emit('create', {room: createRoomDto})

    return {message: "Room created successfully"}
  }

  async findAll() {
    const rooms = await Room
    .createQueryBuilder()
    .leftJoinAndSelect("Room.user_created", "User")
    .select(["Room.id as id", "Room.name as name","User.login as user"])
    .getRawMany()

    return {rooms};
  }

  async remove(id: number, req: Request) {

    const user:IPayload = req.user as IPayload

    const roomId = await Room    
    .createQueryBuilder()
    .leftJoinAndSelect("Room.user_created", "User")
    .select(["Room.id as id"])
    .where("User.login = :login", {login: user.login})
    .where("Room.id = :id", {id})
    .getRawMany()

    if(!roomId) throw new NotFoundException("Room not found")

    await Room.remove(roomId)

    return `This action removes a #${id} room`;
  }
}
