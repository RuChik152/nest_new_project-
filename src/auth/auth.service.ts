import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { InjectModel } from "@nestjs/mongoose";
import { AdminPanelUser } from "./auth.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import  * as jwt from "jsonwebtoken"
import * as process from "process";
import { TokenAuthDto } from "./dto/token-auth.dto";


export type DecodeType = { login: string, iat: number, exp: number }

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminPanelUser.name) private adminPanelUserModel: Model<AdminPanelUser>,
  ){}

  async createUser(userData: CreateAuthDto) {
    try {
      console.log('TEST AUTH CREATE USER SERVICE: ', userData)
      const check = await this.adminPanelUserModel.findOne({login: userData.login})
      console.log('CHECK USER:', check)
      if(!check) {
        return this.adminPanelUserModel.create(userData)
      } else {
        return 'WRONG USER NAME'
      }
      return userData
    }catch (error) {
      console.log('CreateUser AuthService [ERROR]: ', error)
      return error
    }
  }

  async getDataUser(userData: CreateAuthDto) {
    try {
      const user = await this.adminPanelUserModel.findOne({login: userData.login})
      if(user) {
        const check = await bcrypt.compare(userData.pass,user.pass)
        console.log('CHECK',check)
        if (check) {
          const refreshToken = jwt.sign({login: user.login}, process.env.JWT_CONSTANT_REFRESH_TOKEN, {expiresIn: '12h'})
          const accessToken = jwt.sign({login: user.login}, process.env.JWT_CONSTANT_ACCESS_TOKEN, {expiresIn: '1h'})

          await this.adminPanelUserModel.findOneAndUpdate({login: userData.login}, {access_token: accessToken, refresh_token: refreshToken })
          console.log('ACCESS TOKEN: ', accessToken)
          console.log('ACCESS TOKEN: ', refreshToken)
          return {
            access_token: accessToken,
            refresh_token: refreshToken
          }
        }
      }

    }catch (error) {
      console.log('GetDataUser AuthService [ERROR]: ', error)
      return error
    }
  }

  async token(tokenData: TokenAuthDto) {
    try {
      const accessToken = jwt.sign({login: tokenData.login}, process.env.JWT_CONSTANT_ACCESS_TOKEN, {expiresIn: '1h'})
      const {access_token, refresh_token} = await this.adminPanelUserModel.findOneAndUpdate({login: tokenData.login}, {access_token: accessToken})
      return {access_token, refresh_token}
    } catch (error) {
      console.log('Token AuthService [ERROR]: ', error)
      return error
    }


  }

}
