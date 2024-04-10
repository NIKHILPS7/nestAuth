import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserCredentialsDocument = HydratedDocument<UserCredentials>;

@Schema()
export class UserCredentials {
  @Prop({ required: true, type: 'string', unique: true })
  emailId: string;

  @Prop({ required: true, type: 'string' })
  password: string;

  @Prop({ type: 'string', nullable: true, default: '' })
  phoneNumber: string;

  @Prop({ type: 'string', nullable: true, default: '' })
  fullName: string;

  @Prop({ type: 'string', nullable: true, default: '' })
  location: string;

  @Prop({ type: 'string', nullable: false })
  role: string;

  @Prop({ type: 'boolean' })
  isDeleted: boolean;

  @Prop({ type: 'boolean', default: false })
  isActive: boolean;

  @Prop({ type: 'boolean', default: false })
  isLoggedIn: boolean;

  @Prop({ type: 'number', default: 0 })
  loginAttempts: number;

  @Prop({ type: 'string', default: 0 })
  forgotOtpCode: string;

  @Prop({ type: 'date', default: null, nullable: true })
  forgotOtpCreatedAt: Date;

  @Prop({ type: 'date', default: Date.now })
  createdAt: Date;

  @Prop({ type: 'date', default: Date.now })
  updatedAt: Date;

  @Prop({ type: 'date', default: null, nullable: true })
  deletedAt: Date | null;

  @Prop({ type: 'boolean' })
  isVerified: boolean;
}

export const UserCredentialsSchema =
  SchemaFactory.createForClass(UserCredentials);
