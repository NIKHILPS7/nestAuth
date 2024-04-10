import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'user_id' })
  userId: string;

  @ApiProperty({ example: 'access_token' })
  token: string;

  @ApiProperty({ example: 'admin' })
  role: string;

  @ApiProperty({ example: 'example@example.com' })
  emailId: string;

  @ApiProperty({ example: true })
  isEmailVerified: boolean;
}
export class userLoginResponseDto {
    @ApiProperty({ example: 200 })
    status: number;
  
    @ApiProperty({ example: 'success' })
    message: string;
  
    @ApiProperty({ example: AuthResponseDto })
    response: AuthResponseDto;
  }