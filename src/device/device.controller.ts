import { Body, Controller, Delete, Get, Param, Patch, Put, Res, Headers } from "@nestjs/common";
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import {  ApiTags } from "@nestjs/swagger";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { Response } from "express";


@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}


  @Get(':deviceId')
  check(@Param() device: CreateDeviceDto, @Headers('XXX-User-Platform') platform: string) {
      return this.deviceService.check(device, platform)
  }

  @Patch(':deviceId/test')
  updateTest(@Param() device: CreateDeviceDto, @Body() data: UpdateDeviceDto, @Headers('XXX-User-Platform') platform: string){
    return this.deviceService.update(device, data, platform);
  }

  @Patch(':deviceId')
  update(@Param() device: CreateDeviceDto, @Body() data: UpdateDeviceDto, @Headers('XXX-User-Platform') platform: string){
    return this.deviceService.update(device, data, platform);
  }

  @Delete(':deviceId')
  async deleteDevice(@Param() device: UpdateDeviceDto, @Res() res: Response){
    const response = await this.deviceService.deleteDevice(device)
    res.status(response.status).send(response.data)
  }


}
