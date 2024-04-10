import { ApiProperty } from '@nestjs/swagger';

export class updartePasswordResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'success' })
  message: string;

 
}