import { IsOptional, IsString } from "class-validator";

export class CreateHistoryDto {

  @IsString()
  name: string;

  @IsString()
  text: string;

  @IsString()
  @IsOptional()
  oldname?: string;

}
