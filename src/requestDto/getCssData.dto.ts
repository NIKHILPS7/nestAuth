import { IsNotEmpty, IsString } from 'class-validator';

export class getCssDataDTO {
  @IsString()
  @IsNotEmpty()
  pageRoute: string;
}
