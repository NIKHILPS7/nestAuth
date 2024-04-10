import { ApiProperty } from '@nestjs/swagger';

export class refeshTokenResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: 'success' })
  message: string;

  @ApiProperty({ example: {token:'GlMamoPGXteEHvUAaqUvnxefuKm2LKGRlmIbcnFpC1TG5zu/GJQig5SQcrLtlYVCyY/yOk7JGMa/0R6ecLjGkSnTr1KIZBuD37MQJZS6Fr+Htt7J3M3/DzsqqRFOnPUjHIulZ5WK2SYVfa2YEBH9weGmbmk='} })
  response: { token: string };
}