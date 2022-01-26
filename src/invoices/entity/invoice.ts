import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Person } from 'src/persons/entity/person';

@Schema()
export class Invoice extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Person' })
  person: Person;

  @Prop()
  num: number;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  postal: string;
  @Prop()
  date: Date;

  @Prop()
  invoiceDueDate: Date;

  @Prop([
    raw({
      quantity: { type: Number },
      price: { type: Number },
      title: { type: String },
      description: { type: String },
      product: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
    }),
  ])
  rows: Record<string, any>[];

  @Prop()
  note: string;
  @Prop()
  type: TypeInvoice;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
// export const InvoiceSchema = new MongooseSchema({
//   person: { type: MongooseSchema.Types.ObjectId, ref: 'Person' },
//   num: String,
//   date: Date,
//   invoiceDueDate: Date,
//   rows: [
//     {
//       product: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
//       quantity: Number,
//       price: Number,
//     },
//   ],
//   note: String,
// });

export enum TypeInvoice {
  bill = 'bill',
  invoice = 'invoice',
}
