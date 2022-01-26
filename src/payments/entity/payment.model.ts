import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Person } from 'src/persons/entity/person';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop()
  amount: number;

  @Prop({ type: Number, required: false })
  num: number;

  @Prop()
  date: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Person' })
  person: Person;

  @Prop({
    type: String,
    required: true,
    enum: ['received', 'made'],
  })
  type: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
