import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  creatUser(@Body() body: any) {
    return body;
  }

  @Get()
  userInfo() {
    return {
      id: 1,
      name: 'IVAN',
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.authServices.create(createUserDto);
    return user;
  }
}
