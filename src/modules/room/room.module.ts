import { AccessTokenStrategy } from 'src/strategy/AccessToken.strategy';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [RoomController],
  providers: [RoomService, AccessTokenStrategy]
})
export class RoomModule {}
