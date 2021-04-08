import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActivateUserDto } from './dto/activate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.userModel.findOne({ seqID: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { seqID: id },
      { $set: { ...updateUserDto } }
    );
  }

  activate(id: number) {
    return this.userModel.updateOne({ seqID: id }, { $set: { active: true } });
  }

  remove(id: number) {
    return this.userModel.deleteOne({ seqID: id });
  }
}
