import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  getUser(@Param() user: UpdateUserDto){
      return this.userService.getUser(user)
  }

  @Patch('binding/:email/:activateCode')
  binding(@Param('email') email: string, @Param('activateCode') activateCode: string){
      return this.userService.bindingDevice(email, activateCode)
  }

  @Patch()
  userPlatform(@Body() user: UpdateUserDto){
    return this.userService.update(user);
  }

  @Post(':email/:name')
  checkUser(@Param() user: CreateUserDto) {
    return this.userService.checkUser(user)
  }

}
