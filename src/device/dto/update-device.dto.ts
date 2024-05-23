import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateDeviceDto } from "./create-device.dto";
import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { UpdateUserDto } from "../../user/dto/update-user.dto";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {

  @ApiProperty({ example: "CD34", maxLength: 4 })
  @IsOptional()
  @IsString()
  activateCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emojiCode?: string;

  @ApiProperty({
    type: () => UpdateUserDto
  })
  @IsOptional()
  @IsObject()
  left_golem?: UpdateUserDto

  @ApiProperty({
    type: () => UpdateUserDto
  })
  @IsOptional()
  @IsObject()
  right_golem?: UpdateUserDto

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  gold?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  game_time?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  max_damage?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  victory?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_SPDR?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_SKLT?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_GHST?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_ANML?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_ANML_VPR?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_ANML_WLF?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_ANML_BEAR?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_ANML_DEER?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  kill_KARGA?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  DRG_DMG?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  LOSE_LVL?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  DSTR_STONES?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  FRND_DMG?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  FRND_KILL?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  MSHRM?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  GLD_CHST?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  DO_SRVL?: number


  @ApiProperty()
  @IsOptional()
  @IsNumber()
  SRVL?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  SRVL_MAX?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  CSTL?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_duplex?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_rain?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_wind?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_earthquake?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_lightning?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_DRG_fire?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_DRG_healing?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  s_mind_capture?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  DEV?:number

}
