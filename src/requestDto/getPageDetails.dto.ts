import { IsNotEmpty, IsString } from 'class-validator';

export class getPageDetailsDTO {
  @IsString()
  @IsNotEmpty()
  pageId: string;
}
