import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserVerifyDto {
  @IsString()
  @ApiProperty({
    description: 'A one-time key obtained from the SDK Unity Platform',
    type: String,
  })
  nonce: string;

  @IsString()
  @ApiProperty({
    description: 'user ID of the Unity user',
    type: String,
  })
  userID: string;
}

export class UserVerifyResponse {
  @ApiProperty({
    description: 'Response Oculus',
  })
  is_valid: boolean;
}
