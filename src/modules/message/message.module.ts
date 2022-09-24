import { MessageService } from './message.service';
import { ChatGateway } from './message.gateway';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
  ],
  providers: [MessageService, ChatGateway]
})
export class MessageModule { }
