import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class forgotPasswordEmailDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailId: string;
}
