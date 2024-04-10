import { ApiProperty } from '@nestjs/swagger';

export class createUserResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'user created SuccessFully' })
  message: string;

 
}