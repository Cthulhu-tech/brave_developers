import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
