import { IsNotEmpty, IsString } from 'class-validator';

export class EditPageDTO {
  @IsString()
  @IsNotEmpty()
  pageId: string;
  @IsString()
  @IsNotEmpty()
  pageName: string;

  @IsNotEmpty()
  pageData: Record<string, any>;
}
