import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserVerifyDto, UserVerifyResponse } from './user_verify.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/verify')
  @ApiOkResponse({
    status: 200,
    type: UserVerifyResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
  })
  async getVerifyUser(@Body() body: UserVerifyDto) {
    const verifyResponse = await this.userService.verifyUserOculus(body);
    return verifyResponse;
  }

  @Get('/:id')
  @ApiNotFoundResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiCreatedResponse({
    status: 200,
    description: 'Getting all information about a user',
    type: UserDto,
  })
  async getUser(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getInfoUser(id);
    console.log(user);
    return user;
  }

  @Put()
  @ApiOkResponse({
    status: 200,
    description: 'Data user update',
    type: UserDto,
  })
  async putUser(@Body() updateUserData: UserDto): Promise<UserDto> {
    const updateUser = this.userService.updateInfoUser(updateUserData);
    return updateUser;
  }
}
