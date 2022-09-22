import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

import { HttpExceptionFilter } from 'src/filter/httpException.filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/regist')
  @UseFilters(HttpExceptionFilter)
  regist(@Body() createUserDto: UserDto) {
    return this.userService.regist(createUserDto);
  }

  @Post('/login')
  login(@Body() createUserDto: UserDto) {
    return this.userService.login(createUserDto);
  }

  @Post('/refresh')
  refresh() {
    return this.userService.refresh();
  }

  @Post('/lagout')
  lagout() {
    return this.userService.lagout();
  }

}
