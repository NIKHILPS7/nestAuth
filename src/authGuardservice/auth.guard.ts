import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';

import { Roles } from './roles.decorator';
import { Reflector } from '@nestjs/core';
import { HelpersService } from 'src/helpers/helpers.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private reflector: Reflector,
    private helperService: HelpersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const roles = this.reflector.get(Roles, context.getHandler());
    if (token) {
      try {
        const user = await this.helperService.tokenDecrypter(
          token,
          'secretKey',
        );
        console.log(user,'userdd')
        const userExist = await this.helperService.userExistCheck(user.id);
        const expireAtTimeStamp = new Date(user.expireAt);
        const hasRequiredRole = roles?.includes(user.role);
        const now = new Date();
        if (expireAtTimeStamp < now) {
          throw new HttpException('token expired', 412);
        }
        if (!userExist) {
          throw new UnauthorizedException('user does not exist');
        }
        if (roles && !hasRequiredRole) {
          return false;
        } else return true;
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      return false;
    }
  }
}
