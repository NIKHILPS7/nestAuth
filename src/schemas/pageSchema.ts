import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema()
export class Page {
  @Prop({ type: 'string' })
  pageName: string;

  @Prop({ type: 'string' })
  pageRoute: string;

  @Prop({ type: 'string' })
  templateName: string;

  @Prop({ type: Object }) // Define extraData as type Object
  pageData: Record<string, any>;
}

export const PageSchema = SchemaFactory.createForClass(Page);
