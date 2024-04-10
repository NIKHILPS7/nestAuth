import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class deleteUserDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
