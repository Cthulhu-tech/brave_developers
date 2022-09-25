import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SubscribeMessage } from '@nestjs/websockets';
import { CreateRoomDto } from './dto/create-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './room.service';
import { Request } from 'express';

@Controller('room')
@UseGuards(AuthGuard('jwt'))
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @SubscribeMessage('create')
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.roomService.remove(+id, req);
  }
}
