import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDeviceDto } from "./create-device.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {

  @ApiProperty({ example: "CD34", maxLength: 4 })
  @IsOptional()
  @IsString()
  activateCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  gold?: number;

}
