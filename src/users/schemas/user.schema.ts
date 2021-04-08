
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  age: number;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    default: false
  })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
