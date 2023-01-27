import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUser, AdminAuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { AdminUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminUser.name) private authModel: Model<AdminAuthDocument>,
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
}
