import { ApiProperty } from '@nestjs/swagger';

export class deleteUserResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'user deleted SuccessFully' })
  message: string;

 
}