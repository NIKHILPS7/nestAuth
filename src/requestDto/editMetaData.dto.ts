import { IsNotEmpty, IsString } from 'class-validator';

export class metaDataDTO {
  @IsString()
  @IsNotEmpty()
  pageRoute: string;

  @IsString()
  @IsNotEmpty()
  metaData: string;
}
