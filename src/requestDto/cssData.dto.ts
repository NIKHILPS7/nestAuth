import { IsNotEmpty, IsString } from 'class-validator';

export class cssDataDTO {
  @IsString()
  @IsNotEmpty()
  pageRoute: string;

  @IsString()
  cssData: string;
}
