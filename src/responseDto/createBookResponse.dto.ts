import { ApiProperty } from '@nestjs/swagger';

export class createBookResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'book created SuccessFully' })
  message: string;

 
}