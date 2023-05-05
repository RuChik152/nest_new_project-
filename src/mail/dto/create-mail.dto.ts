import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateMailDto {

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  platform?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  sendstatus?: boolean
}
