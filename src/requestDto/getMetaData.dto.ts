import { IsNotEmpty, IsString } from 'class-validator';

export class getMetaDataDTO {
  @IsString()
  @IsNotEmpty()
  pageRoute: string;
}
