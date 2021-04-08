import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenBlacklistDocument = TokenBlacklist & Document;

@Schema()
export class TokenBlacklist extends Document {
  @Prop()
  seqID: number;

  @Prop()
  token: string;
}

export const TokenBlacklistSchema = SchemaFactory.createForClass(
  TokenBlacklist
);
