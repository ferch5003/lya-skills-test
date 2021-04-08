import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import {
  TokenBlacklist,
  TokenBlacklistDocument,
} from 'src/token-blacklist/schemas/token-blacklist.schema';

@Injectable()
export class TokenBlacklistExistGuard implements CanActivate {
  constructor(
    @InjectModel(TokenBlacklist.name)
    private tokenBlacklistModel: Model<TokenBlacklistDocument>
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context
      .switchToHttp()
      .getRequest()
      .headers['authorization'].replace('Bearer ', '');
    return this.tokenBlacklistModel.exists({ token }).then((res) => !res);
  }
}
