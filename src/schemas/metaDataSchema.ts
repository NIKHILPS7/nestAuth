import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type MetaDataDocument = HydratedDocument<MetaData>;

@Schema()
export class MetaData {
  @Prop({ type: mongoose.Schema.Types.ObjectId }) // Use mongoose.Schema.Types.ObjectId
  _id: mongoose.Types.ObjectId;
  @Prop({ type: 'string' })
  pageRoute: string;
  @Prop({ type: 'string' })
  metaData: string;
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
