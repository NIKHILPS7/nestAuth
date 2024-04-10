import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class getPageDTO {
  @IsString()
  @IsNotEmpty()
  pageName: string;
}
