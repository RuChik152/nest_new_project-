import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { UpdateDeviceDto } from "../../device/dto/update-device.dto";

type User_id_Type = {
  user_id: string,
  provider: string,
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty()
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  auth_data?: User_id_Type;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sendstatus?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  news?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  _id?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  nickname?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  DEV?:number

  @ApiProperty({
    type: () => UpdateDeviceDto
  })
  @IsOptional()
  @IsObject()
  device?:UpdateDeviceDto

}
