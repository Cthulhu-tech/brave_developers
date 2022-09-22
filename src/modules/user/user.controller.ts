import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/regist')
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
