import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getInfoUser(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async updateInfoUser(body) {
    await this.userModel.findOneAndUpdate({ _id: body.id }, body);
    const user = await this.userModel.findOne({ _id: body.id });
    return user;
  }
}
