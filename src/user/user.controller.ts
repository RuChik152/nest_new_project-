import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from "@nestjs/swagger";
import { UpdateDeviceDto } from "../device/dto/update-device.dto";
import { GolemType } from "../device/types/device.types";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
   * Точка входы для получения списка всех пользователей и формирования данных для турнирной таблицы
   */
  @Get('list/:email')
  getUsers(@Param() user: UpdateUserDto) {
    return this.userService.getUsers(user);
  }

  @Get(':email')
  getUser(@Param() user: UpdateUserDto){
      return this.userService.getUser(user)
  }

  @Patch('binding/golem/:email/:activateCode')
  golemBinding(@Param() user: UpdateUserDto, @Param() device: UpdateDeviceDto) {
    return this.userService.bindingGolem(user, device);
  }


  @Patch('binding/:email/:activateCode')
  binding(@Param() user: UpdateUserDto, @Param() device: UpdateDeviceDto){
      return this.userService.bindingDevice(user, device)
  }

  @Patch()
  userPlatform(@Body() user: UpdateUserDto){
    return this.userService.update(user);
  }

  @Post(':email/:name')
  checkUser(@Param() user: CreateUserDto) {
    return this.userService.checkUser(user)
  }

  @Delete('binding/:deviceId/:golem')
  deleteGolemBinding(@Param() device: UpdateDeviceDto, @Param('golem') golem: GolemType) {
      return this.userService.deleteGolemBinding(device,golem);
  }

}
