import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePageDTO {
  @IsString()
  @IsNotEmpty()
  pageName: string;

  @IsString()
  @IsNotEmpty()
  pageRoute: string;

  @IsString()
  @IsNotEmpty()
  templateName: string;

  @IsNotEmpty()
  pageData: Record<string, any>;
}
