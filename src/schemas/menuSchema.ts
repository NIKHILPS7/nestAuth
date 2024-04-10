import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MenuDataDocument = HydratedDocument<MenuData>;

@Schema()
export class MenuChildren {
  @Prop({ type: 'string' })
  pageName: string;
  @Prop({ type: 'string' })
  pageRoute: string;
}
@Schema()
export class MenuData {
  @Prop({ type: 'string' })
  pageName: string;
  @Prop({ type: 'string' })
  pageRoute: string;
  @Prop({ type: [MenuChildren] })
  children: MenuChildren[];
}

export const MenuDataSchema = SchemaFactory.createForClass(MenuData);
