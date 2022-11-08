import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({versionKey: false})
export class User {

  @Prop({type: mongoose.Schema.Types.ObjectId, auto: true})
  _id: mongoose.Schema.Types.ObjectId; 

  @Prop({type: mongoose.Schema.Types.String, required: true})
  name: string;

  @Prop({type: mongoose.Schema.Types.String, required: true})
  surname: string;

  @Prop({type: mongoose.Schema.Types.String, required: true})
  emailTemp: string;

  @Prop({type: mongoose.Schema.Types.String, required: true})
  emailCode: string;

  @Prop({type: mongoose.Schema.Types.String, required: false})
  email: string;

  @Prop({type: mongoose.Schema.Types.String, required: true})
  username: string;

  @Prop({type: mongoose.Schema.Types.String, required: true})
  password: string;

  @Prop({type: mongoose.Schema.Types.Number, required: true})
  createdTime: string;

  @Prop({type: mongoose.Schema.Types.String, required: false})
  otp: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);