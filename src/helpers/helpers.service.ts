import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'crypto';
import { Model, ObjectId, Types } from 'mongoose';
import { ResponseHandlerService } from 'src/response-handler/response-handler.service';
import {
  UserCredentials,
  UserCredentialsDocument,
} from 'src/schemas/UserCredentials.schema';
interface User {
  id: Types.ObjectId;
  email: string;
  role: string;
  expireAt: number;
}
const config = new ConfigService();

@Injectable()
export class HelpersService {
  constructor(
    @InjectModel(UserCredentials.name)
    private userModel: Model<UserCredentialsDocument>,
    private responsehandler: ResponseHandlerService,
  ) {}
  async tokenEncrypter(userDetails: User, secretkey: any) {
    const alg = 'aes-256-ctr';
    let key = config.get('SECRET_KEY');
    key = createHash('sha256')
      .update(String(key))
      .digest('base64')
      .substring(0, 32);
    console.log(key, 'key');
    const iv = randomBytes(16);
    const cipher = createCipheriv(alg, key, iv);
    const result = Buffer.concat([
      iv,
      cipher.update(JSON.stringify(userDetails)),
      cipher.final(),
    ]);
    return result.toString('base64');
  }
  async tokenDecrypter(encryptedText: any, secretkey: string) {
    const alg = 'aes-256-ctr';
    let key = config.get('SECRET_KEY');
    key = createHash('sha256')
      .update(String(key))
      .digest('base64')
      .substring(0, 32);
    console.log(encryptedText, typeof encryptedText);
    const encryptedTextBuffer = Buffer.from(encryptedText, 'base64');
    const iv = encryptedTextBuffer.subarray(0, 16);
    const data = encryptedTextBuffer.subarray(16);
    const decipher = createDecipheriv(alg, key, iv);
    const result = Buffer.concat([decipher.update(data), decipher.final()]);
    const returnResult = JSON.parse(result.toString());
    return returnResult;
  }
  generatePassword(): string {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const special = '!@#$&*(),.';
    let password = '';
    for (let i = 0; i < 3; i++) {
      const randomUpperChar =
        uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
      password += randomUpperChar;
    }
    for (let i = 0; i < 1; i++) {
      const randomSpecial = special[Math.floor(Math.random() * special.length)];
      password += randomSpecial;
    }
    for (let i = 0; i < 3; i++) {
      const randomLowerChar =
        lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
      password += randomLowerChar;
    }
    for (let i = 0; i < 3; i++) {
      const randomNumber =
        numericChars[Math.floor(Math.random() * numericChars.length)];
      password += randomNumber;
    }

    return password;
  }
  generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 900000) + 100000;
  };
  async userExistCheck(userId: string) {
    try {
      const userExist = await this.userModel.findOne({
        _id: userId,
      });
      return userExist;
    } catch (err) {
      this.responsehandler.errorformating('userExistCheck', err.message);
    }
  }
  generateRandomNumberImage(): string {
    const bytes = crypto.randomBytes(10);
    const hexString = bytes.toString('hex');
    const decimalNumber = parseInt(hexString, 16);
    return decimalNumber.toString().padStart(20, '0');
  }
}
