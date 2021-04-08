import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;
const SALT = 10;

@Schema()
export class User extends Document {
  @Prop()
  seqID: number;

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
    default: false,
  })
  active: boolean;

  validatePassword: Function;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = bcrypt.hashSync(this.password, SALT);
    next();
  } catch (e) {
    next(e);
  }
});

UserSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compareSync(password, this.password);
};

export { UserSchema };
