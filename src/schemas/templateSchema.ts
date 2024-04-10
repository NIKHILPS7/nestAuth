import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TemplateDocument = HydratedDocument<Template>;

@Schema()
export class Template {
  @Prop({ type: 'string' })
  TemplateName: string;

  @Prop({ type: 'string' })
  TemplateHtml: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
