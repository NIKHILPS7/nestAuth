import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class forgotOtpVerfifyDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  otp: string;
}
