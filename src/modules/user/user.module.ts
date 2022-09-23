import { RefreshTokenStrategy } from 'src/strategy/RefreshToken.strategy';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [UserController],
  providers: [UserService, RefreshTokenStrategy]
})

export class UserModule {}
