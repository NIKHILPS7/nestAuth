import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
