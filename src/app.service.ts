import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  login(): string {
    return 'login';
  }
  regist(): string {
    return 'regist';
  }
  lagout(): string {
    return 'lagout';
  }
}
