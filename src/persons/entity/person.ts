import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Person extends Document {
  @Prop()
  name: string;

  @Prop()
  companyName: string;

  @Prop()
  address: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop()
  postal: string;
  @Prop()
  mobilePhone: string;
  @Prop()
  workPhone: string;
  @Prop()
  email: string;
  @Prop()
  customer: boolean;
  @Prop()
  vendor: boolean;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
