import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDevClientDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  healthPoint?: number;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  damage?: number;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  shieldPoint?: number;
}
