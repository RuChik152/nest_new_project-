import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, AdminAuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { AdminUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<AdminAuthDocument>,
  ) {}

  async create(createAdminUserDto: AdminUserDto) {
    const createUser = await this.authModel.create(createAdminUserDto);
    return createUser;
  }

  async find(findAdminUserDto: AdminUserDto) {
    const findUser = await this.authModel.findOne({
      email: findAdminUserDto.email,
    });
    return findUser;
  }

  async writeUserData(userData: AdminUserDto) {
    const user = await this.authModel.findOne({
      email: userData.email
    })
    if (!user) {
      const {email, name} = await this.authModel.create(userData);
      return { email, name, state: "new" }
    }
    return {user, state: "old"}
  }
}
