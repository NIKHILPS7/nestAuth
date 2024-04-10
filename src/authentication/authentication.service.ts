import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/requestDto/createUser.dto';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import { settings, SettingsDocument } from 'src/schemas/Settings.schema';
import {
  UserCredentials,
  UserCredentialsDocument,
} from 'src/schemas/UserCredentials.schema';
import { promisify } from 'util';
import { LoginDTO } from 'src/requestDto/login.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { forgotPasswordEmailDTO } from 'src/requestDto/forgotPasswordEmail.dto';
import { forgotOtpVerfifyDTO } from 'src/requestDto/forgotOtpVerification.dto';
import { updatePasswordDTO } from 'src/requestDto/updatePassword.dto';
import { editUserDTO } from 'src/requestDto/editUser.dto';
import { deleteUserDTO } from 'src/requestDto/deleteUser.dto';
import { RefreshTokenDTO } from 'src/requestDto/refreshToken.dto';
import { access } from 'fs';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(UserCredentials.name)
    private userModel: Model<UserCredentialsDocument>,
    @InjectModel(settings.name)
    private settings: Model<SettingsDocument>,
    private responseHandler: ResponseHandlerService,
    private helperService: HelpersService,
  ) {}

  async createUser(input: CreateUserDTO) {
    try {
      const emailId = input.emailId.toLowerCase();
      const response = await this.emailExistCheck(emailId);

      if (!response) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(input.password, saltOrRounds);
        const userData = new UserCredentials();
        userData.emailId = emailId;
        userData.password = hashedPassword;
        userData.fullName = input.fullName;
        userData.location = input.location;
        userData.phoneNumber = input.phoneNumber;
        const createResponse = await this.userModel.create(userData);

        if (createResponse) {
          const resposneData = {
            message: 'user created successfully',
            statusCode: 200,
          };
          return resposneData;
        }
      } else {
        throw new HttpException('user creation failed', 400);
      }
    } catch (err) {
      this.responseHandler.errorformating('createUser', err.message);
    }
    return {
      message: 'something went wrong',
      statusCode: 200,
    };
  }
  async emailExistCheck(emailId: string): Promise<boolean> {
    try {
      const emailResponse = await this.userModel.findOne({ emailId });
      if (emailResponse) {
        throw new HttpException('user already exists', 400);
      }
    } catch (err) {
      this.responseHandler.errorformating('emailExistCheck', err.message);
      return true;
    }
    return false;
  }
  async userLogin(input: LoginDTO){
    try {
      const emailId = input.emailId.toLowerCase();
      const user = await this.userModel.findOne({ emailId: emailId }).exec();
      const tokenDetails = await this.settings
        .find({ Group: 'token', Key: 'auth' })
        .exec();
      let passwordValid: boolean;
      if (user) {
        passwordValid = await bcrypt.compare(input.password, user.password);
      }

      if (!user) {
        throw new HttpException('user does not exist', 403);
      }
      if (user && passwordValid) {
        const payload = {
          id: user._id,
          email: user.emailId,
          role: user.role,
          expireAt: Date.now() + 1000 * 1000,
        };

        const access_token = await this.helperService.tokenEncrypter(
          payload,
          'secretKey',
        );
        const resposneData = {
          userId: user._id,
          token: access_token,
          role: user.role,
          emailId: user.emailId,
          isEmailVerified: user.isVerified,
        };
        return {
          status: 200,
          message: 'user deleted successfully',
          response: resposneData,
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Please check emailId or password',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    } catch (err) {
      this.responseHandler.errorformating('userLogin', err.message);
    }
    return {
      status: 403,
      message: 'Please check emailId or password',
      response: {},
    };
  }
  async editUser(input: editUserDTO) {
    try {
      const user = await this.userModel.updateOne(
        { _id: input.userId, isDeleted: false },
        {
          $set: {
            fullName: input.fullName,
            phoneNumber: input.phoneNumber,
          },
        },
      );
      if (user) {
        return {
          statusCode: 200,
          message: 'user details edited successfully',
        };
      } else {
        throw new HttpException('something went wrong', 403);
      }
    } catch (err) {
      this.responseHandler.errorformating('editUser', err.message);
    }
    return {
      statusCode: 403,
      message: 'something went wrong',
    };
  }


  async deleteUser(userId: string) {
    try {
      const user = await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            isDeleted: true,
            deletedAt: Date.now(),
          },
        },
      );
      if (user) {
        return {
          statusCode: 200,
          message: 'success',
        };
      } else {
        throw new HttpException('something went wrong', 403);
      }
    } catch (err) {
      this.responseHandler.errorformating('deleteUser', err.message);
    }
    return {
      statusCode: 403,
      message: 'something went wrong',
    };
  }
  async forgotPasswordEmail(
    input: forgotPasswordEmailDTO,
  ) {
    try {
      const email = input.emailId.toLowerCase();
      const user = await this.userModel.findOne({
        emailId: email,
        // isDeleted: false,
      });
      if (user) {
       const forgotMailOTP= await this.forgotMail(user._id.toString(), user.emailId, user.fullName);
        return {
          statusCode: 200,
          message: 'success',
          response:{
            otp:forgotMailOTP
          }
        };
      } else {
        throw new HttpException('something went wrong', 403);
      }
    } catch (err) {
      this.responseHandler.errorformating('forgotPasswordEmail', err.message);
      console.log(err);
    }
    return {
      statusCode: 403,
      message: 'something went wrong',
    };
  }
  async forgotMail(userId: string, emailId: string, fullname: string) {
    try {
      const sixDigitRandomNumber = this.helperService.generateRandomNumber();
      await this.updateforgototpforuser(userId, sixDigitRandomNumber);

      return sixDigitRandomNumber.toString()
      
    } catch (err) {
      this.responseHandler.errorformating('forgotMail', err.message);
    }
  }
  async updateforgototpforuser(
    userId: string,
    forgotpasswordverifyotp: number,
  ) {
    try {
      await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            forgotOtpCode: forgotpasswordverifyotp,
            forgotOtpCreatedAt: new Date(),
          },
        },
      );
    } catch (err) {
      this.responseHandler.errorformating(
        'updateforgototpforuser',
        err.message,
      );
      return err;
    }
  }
  async forgotOtpVerify(input: forgotOtpVerfifyDTO) {
    try {
      const email = input.emailId.toLowerCase();
      const oneMinuteAgo = new Date(Date.now() - 70 * 1000);
      const user = await this.userModel
        .findOne({
          emailId: email,
          forgotOtpCode: input.otp,
          // createdAt: { $gte: oneMinuteAgo },
        })
        .exec();
      if (user && user.emailId) {
        await this.userModel.updateOne(
          { emailId: user.emailId },
          { $set: { isVerified: true } },
        );
        return this.responseHandler.responseformatting(
          200,
          { userId: user._id.toString() },
          'otp verified successfully',
        );
      } else {
        this.responseHandler.errorformating(
          'forgotOtpVerify',
          'OTP verification failed',
        );
      }
    } catch (err) {
      this.responseHandler.errorformating('forgotOtpVerify', err.message);
    }
  }
  async updatePassword(input: updatePasswordDTO) {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(input.newPassword, saltOrRounds);
      const user = await this.userModel.updateOne(
        { _id: input.userId },
        {
          $set: {
            password: hashedPassword,
          },
        },
      );
      if (user) {
        return this.responseHandler.responseformatting(
          200,
          null,
          'password updated successfully',
        );
      } else {
        this.responseHandler.errorformating(
          'updatePassword',
          'something went wrong',
        );
      }
    } catch (err) {
      this.responseHandler.errorformating('updatePassword', err.message);
    }
  }
  async refreshToken(input: RefreshTokenDTO) {
    try {
      const user= await this.helperService.tokenDecrypter(
        input.token,
        'secretKey',
      );
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        expireAt: Date.now() + 1000 * 1000,
      };
      const access_token = await this.helperService.tokenEncrypter(
        payload,
        'secretKey',
      );
      if(access_token){
      const resposneData = {
        token: access_token,
       
      };
      return {
        status: 200,
        message: 'success',
        response: resposneData,
      };}
      else{
        this.responseHandler.errorformating(
          'refreshToken',
          'refresh token generating failed',
        );
      }
    } catch (err) {
      this.responseHandler.errorformating('updatePassword', err.message);
    }
  }
}
