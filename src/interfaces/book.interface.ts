import { Document } from 'mongoose';

export interface Book extends Document {
  readonly _id: string;
  readonly name: string;
}