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

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({ seqID: id });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne(
      { seqID: id },
      { $set: { ...updateUserDto } }
    );
  }

  async activate(id: number) {
    return this.userModel.updateOne({ seqID: id }, { $set: { active: true } });
  }

  async remove(id: number) {
    return this.userModel.deleteOne({ seqID: id });
  }
}
