import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateHomeHeaderDTO {
  @IsNotEmpty()
  routes: string[];

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  backgroundImage: string;
}
