import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/orm.config';

import { MessageModule } from './modules/message/message.module';
import { RoomModule } from './modules/room/room.module';
import { UserModule } from './modules/user/user.module';
import { AuthCheck } from './middleware/token';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config),
    RoomModule,
    MessageModule,
    UserModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    
    consumer.apply(AuthCheck)
    .exclude({path: "regist", method: RequestMethod.POST})
    .forRoutes({path: "*", method: RequestMethod.ALL})
  }

}
