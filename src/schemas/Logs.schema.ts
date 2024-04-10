import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LogsDocument = HydratedDocument<Logs>;

@Schema()
export class Logs {
  @Prop({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Prop({ type: 'string' })
  functionName: string;

  @Prop({ type: 'string' })
  errorDescription: string;

  @Prop({ type: 'date', default: Date.now })
  createdAt: Date;

  @Prop({ type: 'date', default: Date.now })
  updatedAt: Date;

  @Prop({ type: 'date', default: null, nullable: true })
  deletedAt: Date | null;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
