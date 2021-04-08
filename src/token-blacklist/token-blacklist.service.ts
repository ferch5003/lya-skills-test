import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TokenBlacklist,
  TokenBlacklistDocument,
} from './schemas/token-blacklist.schema';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectModel(TokenBlacklist.name)
    private tokenBlacklistModel: Model<TokenBlacklistDocument>
  ) {}

  async create(token: string): Promise<TokenBlacklist> {
    return new this.tokenBlacklistModel({ token }).save();
  }
}
