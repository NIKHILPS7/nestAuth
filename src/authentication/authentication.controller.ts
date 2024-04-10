import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/requestDto/createUser.dto';
import { AuthenticationService } from './authentication.service';
import { LoginDTO } from 'src/requestDto/login.dto';
import { AuthGuardService } from 'src/authGuardservice/auth.guard';
import { deleteUserDTO } from 'src/requestDto/deleteUser.dto';
import { forgotPasswordEmailDTO } from 'src/requestDto/forgotPasswordEmail.dto';
import { forgotOtpVerfifyDTO } from 'src/requestDto/forgotOtpVerification.dto';
import { updatePasswordDTO } from 'src/requestDto/updatePassword.dto';
import { editUserDTO } from 'src/requestDto/editUser.dto';
import { Roles } from 'src/authGuardservice/roles.decorator';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDTO } from 'src/requestDto/refreshToken.dto';
import { refeshTokenResponseDto } from 'src/responseDto/resfreshTokenResponse.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Post('createUser')
  
  @ApiProperty({type:CreateUserDTO})
  @UsePipes(ValidationPipe)
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: CreateUserDTO,
  ) {
    response.send(await this.authService.createUser(input));
  }

  @Post('userLogin')
  @ApiProperty({type:LoginDTO})
  @UsePipes(ValidationPipe)
  async userLogin(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: LoginDTO,
  ) {
    response.send(await this.authService.userLogin(input));
  }
  @Post('deleteUser')
  @ApiProperty({type:deleteUserDTO})
  @UsePipes(ValidationPipe)
  async deleteUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: deleteUserDTO,
  ) {
    response.send(await this.authService.deleteUser(input.userId));
  }
  @Post('editUser')
  @ApiProperty({type:editUserDTO})
  @UsePipes(ValidationPipe)
  async editUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: editUserDTO,
  ) {
    response.send(await this.authService.editUser(input));
  }
  @Post('forgotPasswordEmail')
  @ApiProperty({type:forgotPasswordEmailDTO})
  @UsePipes(ValidationPipe)
  async forgotPasswordEmail(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: forgotPasswordEmailDTO,
  ) {
    response.send(await this.authService.forgotPasswordEmail(input));
  }

  @Post('forgotOtpVerify')
  @ApiProperty({type:forgotOtpVerfifyDTO})
  @UsePipes(ValidationPipe)
  async forgotOtpVerify(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: forgotOtpVerfifyDTO,
  ) {
    response.send(await this.authService.forgotOtpVerify(input));
  }

  @Post('updatePassword')
  @ApiProperty({type:updatePasswordDTO})
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: updatePasswordDTO,
  ) {
    response.send(await this.authService.updatePassword(input));
  }

  @Post('refreshToken')
  @ApiProperty({type:RefreshTokenDTO})
  @ApiResponse({ status: 200, description: 'Success', type: refeshTokenResponseDto })
  @UsePipes(ValidationPipe)
  async refreshToken(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: RefreshTokenDTO,
  ) {
    response.send(await this.authService.refreshToken(input));
  }
  // @Get('protect')
  // @UsePipes(ValidationPipe)
  // @Roles(['Admin'])
  // @UseGuards(AuthGuardService)
  // async protected(@Req() request: Request, @Res() response: Response) {
  //   response.send({ data: 'data' });
  // }
}
