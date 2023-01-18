import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AdminUserDto} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  // @Post('')
  // creatUser(@Body() body: AdminUserDto) {
  //   return body;
  // }

  @Post('signup')
  async signup(@Body() createAdminUserDto: AdminUserDto) : Promise<AdminUserDto> {
    const user = await this.authServices.create(createAdminUserDto);
    return user;
  }

  @Post('signin')
  async signin(@Body() findAdminUserDto: AdminUserDto) {
      const findUser = await this.authServices.find(findAdminUserDto)
      return findUser;
  }

}
