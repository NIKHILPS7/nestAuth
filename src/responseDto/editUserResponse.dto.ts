import { ApiProperty } from '@nestjs/swagger';

export class editUserResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'user details edited SuccessFully' })
  message: string;

 
}