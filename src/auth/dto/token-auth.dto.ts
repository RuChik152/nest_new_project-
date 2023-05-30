import { Prop } from "@nestjs/mongoose";
import { IsOptional, IsString } from "class-validator";

export class TokenAuthDto {

  @IsOptional()
  @IsString()
  login?: string

  @IsString()
  @IsOptional()
  access_token?: string | null

  @IsString()
  @IsOptional()
  refresh_token?: string | null


}