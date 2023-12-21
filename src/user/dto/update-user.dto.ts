import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsObject, IsOptional, IsString } from "class-validator";

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

}
