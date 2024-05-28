import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, Res } from "@nestjs/common";
import {Response} from "express"
import { AuthService, DecodeType } from "./auth.service";
import { CreateAuthDto } from './dto/create-auth.dto';
import  * as jwt from "jsonwebtoken"
import * as process from "process";
import { UpdateAuthDto } from './dto/update-auth.dto';
import { HttpStatusCode } from "axios";
import { TokenAuthDto } from "./dto/token-auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post()
  async createUser(@Body() userData: CreateAuthDto) {
    try {
      console.log('TEST CREATE USER CONTROLLER: ', userData)
      return await this.authService.createUser(userData)
    }catch (error) {
      console.log('CreateUser AuthController [ERROR]: ', error)
      return error
    }
  }

  @Get('/:login/:pass')
  async getUser(@Param() params: CreateAuthDto) {
    console.log('GET PASS', params.pass)
    console.log('GET LOGIN', params.login)
    return this.authService.getDataUser(params)
  }

  @Put()
  async checkToken(@Body() tokenData: TokenAuthDto, @Res() res: Response) {
    try {
      const data = await this.authService.token(tokenData)
      res.status(200).send(data)
    } catch (error) {
      console.log('CheckToken AuthController [ERROR]: ', error)
      res.status(500).send(error)
    }


  }

}
