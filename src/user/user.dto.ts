import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'ID user',
    type: String,
  })
  id: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the player in the game',
    type: String,
  })
  name?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Maximum health level',
    type: Number,
  })
  healthPoints?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'The amount of gold that the user owns',
    type: Number,
  })
  gold?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'User experience',
    type: Number,
  })
  experience?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'User level',
    type: Number,
    minimum: 0,
    maximum: 9999999999,
  })
  level?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description:
      'This ID is a link to another document, it is an object for storing all abilities',
    type: String,
  })
  abilities?: string;
}
