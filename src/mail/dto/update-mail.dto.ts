import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateMailDto } from './create-mail.dto';
import { IsOptional, IsString } from "class-validator";

export class UpdateMailDto extends PartialType(CreateMailDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  deviceId?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  text?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  subject?: string
}
