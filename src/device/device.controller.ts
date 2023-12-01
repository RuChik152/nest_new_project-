import { Body, Controller, Get, Param, Patch, Put } from "@nestjs/common";
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import {  ApiTags } from "@nestjs/swagger";
import { UpdateDeviceDto } from "./dto/update-device.dto";


@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}


  @Get(':deviceId')
  check(@Param() device: CreateDeviceDto) {
      return this.deviceService.check(device)
  }

  @Patch(':deviceId')
  update(@Param() device: CreateDeviceDto, @Body() data: UpdateDeviceDto){
    return this.deviceService.update(device, data);
  }


}
