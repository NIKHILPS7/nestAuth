import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserCredentialsDocument } from './UserCredentials.schema';

export type SettingsDocument = HydratedDocument<settings>;
@Schema()
export class settings {
  @Prop({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Prop({ type: 'date', default: Date.now })
  createdAt: Date;

  @Prop({ type: 'date', default: Date.now })
  updatedAt: Date;

  @Prop({ type: 'boolean', default: false })
  isActive: boolean;

  @Prop({ type: 'string' })
  Key: string;

  @Prop({ type: 'string' })
  Value: string;

  @Prop({ type: 'string' })
  Group: string;

  @Prop({ type: 'boolean', default: false })
  isClientVisible: boolean;
}

export const SettinsSchema = SchemaFactory.createForClass(settings);
