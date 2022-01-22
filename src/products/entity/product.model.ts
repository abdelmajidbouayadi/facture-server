import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  sellingPrice: number;
  @Prop()
  costPrice: number;
  @Prop()
  barcode: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
