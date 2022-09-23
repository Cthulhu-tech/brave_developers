import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IPayload } from 'src/interface/interface';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

import { JWT } from './entities/token.entity';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  accessTime = 1800
  refreshTime = 604800

  constructor(private jwt: JwtService) {}
  
  private singUser(user: User | IPayload, time: number) {
    return this.jwt.sign({
      sub: (user as User).id | (user as IPayload).sub,
      login: user.login,
      claim: "user",
    }, { expiresIn: time })
  }

  private async deleteToken(req: Request){
    await JWT.delete({token: req.cookies.refresh})
  }

  private checkData(user: UserDto){
    if(!user.login || !user.password) throw new UnauthorizedException("Not all fields are filled")
  }

  private async tokenCreate(res: Response, findUser: User | IPayload) {

    const accessToken = await this.singUser(findUser, this.accessTime)
    const refreshToken = await this.singUser(findUser, this.refreshTime)

    await res.cookie('refresh', refreshToken, {httpOnly: true, domain: 'localhost', maxAge: (new Date().getTime() / 1000) + this.refreshTime});
    return {accessToken, refreshToken}
  }

  async regist(user: UserDto) {

      this.checkData(user)

      const findUser = await User.findOne({where: {login: user.login}})

      if(findUser) throw new UnauthorizedException("This user has already been created")

      const hashPassword = await bcrypt.hashSync(user.password, 10)
      
      await User.create({login: user.login, password: hashPassword}).save()
      return `User: ${user.login} create!`;
  }

  async login(user: UserDto, res: Response, req: Request) {

    this.checkData(user)

    const findUser = await User.findOne({where: {login: user.login}})
    if(!findUser) throw new UnauthorizedException("Login or password incorrect")

    const password = await bcrypt.compareSync(user.password, findUser.password)
    if(!password) throw new UnauthorizedException("Login or password incorrect")

    const {accessToken, refreshToken} = await this.tokenCreate(res, findUser)
    await this.deleteToken(req)
    await JWT.create({user_id: findUser, token: refreshToken}).save()
    return {accessToken, user: user.login}
  }

  async refresh(res: Response, req: Request){

    const findUser = await User.findOne({where: {login: (req.user as IPayload).login}})
    if(!findUser) throw new UnauthorizedException("Login or password incorrect")

    const {accessToken, refreshToken} = await this.tokenCreate(res, req.user as IPayload)
    await this.deleteToken(req)
    await JWT.create({user_id: findUser, token: refreshToken}).save()
    return {accessToken, user: (req.user as IPayload).login}
  }

  lagout(){
    return 'This action lagout a user';
  }
}
