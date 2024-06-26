import { ApiProperty } from '@nestjs/swagger';

export class OTPVerifyResponseDto {
  @ApiProperty({ example: 'doj433343434343434342234342j33djdjdioo33' })
  userId: string;
}
export class forgotOTPvefifyResponseDto {
    @ApiProperty({ example: 200 })
    status: number;
  
    @ApiProperty({ example: 'otp verfied successfully' })
    message: string;
  
    @ApiProperty({ example: OTPVerifyResponseDto })
    response: OTPVerifyResponseDto;
  }