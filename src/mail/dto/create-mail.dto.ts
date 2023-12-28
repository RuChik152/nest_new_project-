import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";

export type User_id_Type = {
  user_id: string,
  provider: string,
}

export class CreateMailDto {

  // @ApiProperty()
  // @IsString()
  // email: string
  //
  // @ApiProperty()
  // @IsString()
  // name: string
  //
  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // platform?: string
  //
  // @ApiProperty()
  // @IsObject()
  // @IsOptional()
  // auth_data?: User_id_Type
  //
  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // sendstatus?: boolean
  //
  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // news?:boolean
}
