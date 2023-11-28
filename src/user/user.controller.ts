import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('binding/:email/:activateCode')
  binding(@Param('email') email: string, @Param('activateCode') activateCode: string){
      return this.userService.bindingDevice(email, activateCode)
  }

  @Patch()
  userPlatform(@Body() user: UpdateUserDto){
    return this.userService.update(user);
  }

  @Post(':email/:name')
  create(@Param() user: CreateUserDto) {
    console.log("CREATE: ", user)
    return this.userService.create(user)
  }




}
