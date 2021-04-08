import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class UserActiveGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const id = +context.switchToHttp().getRequest().params.id;
    return this.userModel
      .findOne({ seqID: id, active: true })
      .exec()
      .then((res) => !!res);
  }
}
