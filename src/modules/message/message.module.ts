import { AccessTokenStrategy } from 'src/strategy/AccessToken.strategy';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [MessageController],
  providers: [MessageService, AccessTokenStrategy]
})
export class MessageModule {}
