import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BooksDocument = HydratedDocument<Books>;

@Schema()
export class Books {

  @Prop({ type: 'string', nullable: true, default: '' })
  name: string;

  @Prop({ type: 'string', nullable: true, default: '' })
  frontImage: string;

  @Prop({ type: 'string', nullable: true, default: '' })
  description: string;
 
}

export const BooksSchema =
  SchemaFactory.createForClass(Books);
