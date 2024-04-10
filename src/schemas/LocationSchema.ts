import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<locations>;

@Schema()
export class locations {
  @Prop({ type: 'string' })
  locationName: string;

  @Prop({ type: 'string' })
  locationKey: string;

  @Prop({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Prop({ type: 'date', default: Date.now })
  createdAt: Date;

  @Prop({ type: 'date', default: Date.now })
  deletedAt: Date;
}

export const locationSchema = SchemaFactory.createForClass(locations);
