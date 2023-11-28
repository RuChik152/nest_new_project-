import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDeviceDto } from './create-device.dto';
import { IsOptional, IsString } from "class-validator";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {

  @ApiProperty({maxLength:4})
  @IsOptional()
  @IsString()
  activateCode?: string;
}
