import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHistoryDto {

  @IsNumber()
  @IsOptional()
  lvl?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  oldname?: string;

}
