import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";

export class CreateAchievementDto {
  @ApiProperty()
  @IsString()
  name:string

  @ApiProperty()
  @IsObject()
  condition: object

}
