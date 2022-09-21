import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  login(): string {
    return this.appService.login();
  }
  @Post()
  regist(): string {
    return this.appService.regist();
  }
  @Post()
  lagout(): string {
    return this.appService.lagout();
  }
}
