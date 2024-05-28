import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnaliticDto {
  @ApiPropertyOptional()
  email: string

  @ApiPropertyOptional()
  eventData: {
    dataEvent: string
    event: string
    value: string
  }

  @ApiPropertyOptional()
  name: string

  @ApiPropertyOptional()
  sessionId: string

  @ApiPropertyOptional()
  utm: {}
}
