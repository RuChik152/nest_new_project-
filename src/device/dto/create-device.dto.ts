import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDeviceDto {

  @ApiProperty()
  @IsString()
  deviceId: string
}
