import { Controller, Post, Body, UseFilters, UseGuards, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

import { HttpExceptionFilter } from 'src/filter/httpException.filter';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/regist')
  @UseFilters(HttpExceptionFilter)
  regist(@Body() createUserDto: UserDto) {
    return this.userService.regist(createUserDto);
  }

  @Post('/login')
  login(@Body() createUserDto: UserDto, @Res({passthrough: true}) res: Response, @Req() req: Request) {
    return this.userService.login(createUserDto, res, req);
  }

  @Post('/refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@Res({passthrough: true}) res: Response, @Req() req: Request) {
    return this.userService.refresh(res, req);
  }

  @Post('/lagout')
  lagout() {
    return this.userService.lagout();
  }

}
