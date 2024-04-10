import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;


}
