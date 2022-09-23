import { MessageService } from './message.service';
import { ChatGateway } from './message.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [MessageService, ChatGateway]
})
export class MessageModule {}
