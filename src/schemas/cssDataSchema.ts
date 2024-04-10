import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type CssDataDocument = HydratedDocument<CssData>;

@Schema()
export class CssData {
  @Prop({ type: mongoose.Schema.Types.ObjectId }) // Use mongoose.Schema.Types.ObjectId
  _id: mongoose.Types.ObjectId;
  @Prop({ type: 'string' })
  pageRoute: string;
  @Prop({ type: 'string' })
  cssData: string;
}

export const CssDataSchema = SchemaFactory.createForClass(CssData);
