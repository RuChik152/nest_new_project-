import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

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

}
