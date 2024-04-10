import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SectionDocument = HydratedDocument<Section>;

@Schema({ strict: false })
export class Section {
  @Prop({ type: 'string' })
  sectionName: string;
  @Prop({ type: Object }) // Define extraData as type Object
  sectionData: Record<string, any>;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
