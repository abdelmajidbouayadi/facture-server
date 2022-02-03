import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps :true})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({required:true, unique: true})
  email: string;

  @Prop()
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);