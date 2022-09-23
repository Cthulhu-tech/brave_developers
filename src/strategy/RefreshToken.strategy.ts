import { PassportStrategy } from '@nestjs/passport';
import { IPayload } from 'src/interface/interface';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor() {
    super({
      jwtFromRequest: RefreshTokenStrategy.extractJWT,
      secretOrKey: process.env.JWT_SECRET,
      ignoreExppiration: false,
    });
  }

  static extractJWT(req: Request): string | null {
    if (req.cookies.refresh && req.cookies.refresh.length > 0) return req.cookies.refresh;
    return null;
  }

  async validate(payload: IPayload) {
    return payload
  }
}