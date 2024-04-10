import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class MenuData {
  @IsString()
  @IsNotEmpty()
  pageName: string;

  @IsString()
  @IsNotEmpty()
  pageRoute: string;
}

export class CreateMenuDTO {
  @IsString()
  @IsNotEmpty()
  pageName: string;

  @IsString()
  @IsNotEmpty()
  pageRoute: string;

  @IsArray()
  @IsNotEmpty()
  children: MenuData[];
}
