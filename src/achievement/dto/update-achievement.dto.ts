import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAchievementDto } from './create-achievement.dto';
import { IsString } from "class-validator";

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {
  @ApiProperty()
  participants: any

  @ApiProperty()
  @IsString()
  _id: string
}
