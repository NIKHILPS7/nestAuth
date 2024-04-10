import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class forgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsNotEmpty()
  locationKey: string;
}
