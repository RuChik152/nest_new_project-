import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<Auth> {
    const createUser = await this.authModel.create(createUserDto);
    return createUser;
  }
}
