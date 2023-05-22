import { IsOptional, IsString } from "class-validator";

export class CreateHistoryDto {

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
