import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop()
  tel: string[];
}

export const PersonSchema = SchemaFactory.createForClass(Person);
