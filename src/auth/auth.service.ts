import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from "@nestjs/mongoose";
import { AdminPanelUser } from "./auth.schema";
import { Model } from "mongoose";

@Injectable()
export class AuthService {
  constructor(@InjectModel(AdminPanelUser.name) private adminPanelUserModel: Model<AdminPanelUser>){}

  async createUser(userData: CreateAuthDto) {
    try {
      console.log('TEST AUTH CREATE USER SERVICE: ', userData)
      return userData
    }catch (error) {
      console.log('CreateUser AuthService [ERROR]: ', error)
      return error
    }
  }

}
