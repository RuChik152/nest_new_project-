
import { IsArray, IsOptional, IsString } from "class-validator";
export class CreateAuthDto {

  @IsString()
  login: string

  @IsString()
  pass: string

  @IsArray()
  @IsOptional()
  group?: string[]

}
