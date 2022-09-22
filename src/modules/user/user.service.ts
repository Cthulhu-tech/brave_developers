import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  private checkData(user: UserDto){

    if(!user.login || !user.password) throw new UnauthorizedException("Not all fields are filled")
  }

  async regist(user: UserDto) {

    try {

      this.checkData(user)

      const findUser = await User.findOne({where: {login: user.login}})

      if(findUser) throw new UnauthorizedException("This user has already been created")

      const hashPassword = await bcrypt.hashSync(user.password, 10)
      
      await User.create({login: user.login, password: hashPassword}).save()

      return `User: ${user.login} create!`;

    }catch(error){

      throw new InternalServerErrorException("Sorry the server couldn't process your request")
    }
  }

  login(user: UserDto) {

    this.checkData(user)
    
  }

  refresh(){
    return 'This action refresh a user';
  }

  lagout(){
    return 'This action lagout a user';
  }
}
