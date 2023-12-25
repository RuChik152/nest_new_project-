import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateDeviceDto } from "../device/dto/update-device.dto";
import { GolemType } from "../device/types/device.types";
import { Response } from "express";
import { User } from "./entities/user.schema";
import { assignWith } from "lodash";




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

  @ApiResponse({ status: 200, description: "Возвращаються обновленные данные по пользователю"})
  @ApiResponse({ status: 404, description: "Аккаунт друга не активирован"})
  @ApiResponse({ status: 500, description: "Ошибка сервера"})
  @Patch('binding/golem/:email/:activateCode')
  async golemBinding(@Param() user: UpdateUserDto, @Param() device: UpdateDeviceDto, @Res() res: Response) {
    const response = await this.userService.bindingGolem(user, device);
    res.status(response.status).send(response.data)
  }


  @Patch('binding/:email/:activateCode')
  async binding(@Param() user: UpdateUserDto, @Param() device: UpdateDeviceDto, @Res() res: Response){
      const response = await this.userService.bindingDevice(user, device);
      res.status(response.status).send(response.data);
  }

  @Patch(":email")
  async userPlatform(@Body() data: UpdateUserDto, @Param('email') email: string, @Res() res: Response){
    const response = await this.userService.update(data, email);
    res.status(response.status).send(response.data);
  }

  @Post(':email/:name')
  checkUser(@Param() user: CreateUserDto) {
    return this.userService.checkUser(user)
  }

  @Delete('binding/:email/')
  deleteBindingGolem(@Param() user: UpdateUserDto){
      return this.userService.deleteBinding(user);
  }

  @Delete('binding/:deviceId/:golem')
  deleteGolemBinding(@Param() device: UpdateDeviceDto, @Param('golem') golem: GolemType) {
      return this.userService.deleteGolemBinding(device,golem);
  }




}
