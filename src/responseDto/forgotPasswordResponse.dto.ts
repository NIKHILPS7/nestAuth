import { ApiProperty } from '@nestjs/swagger';

export class OTPResponseDto {
  @ApiProperty({ example: '990033' })
  otp: string;

  
}
export class forgotPasswordResponseDto {
    @ApiProperty({ example: 200 })
    status: number;
  
    @ApiProperty({ example: 'success' })
    message: string;
  
    @ApiProperty({ example: OTPResponseDto })
    response: OTPResponseDto;
  }