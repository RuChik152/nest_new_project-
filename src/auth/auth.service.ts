import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, AdminAuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { AdminUserDto } from './auth.dto';
import emailjs from '@emailjs/nodejs';
import * as process from "process";

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
      const templateParams = {
        name,
        mail: email,
      };
      emailjs.send(`${process.env.EMAIL_JS_SERVICE_ID}`,`${process.env.EMAIL_JS_TEMPLATE_ID}`,templateParams, {
        publicKey: process.env.EMAIL_JS_PUBLICK_KEY,
        privateKey: process.env.EMAIL_JS_PRIVATE_KEY,
      }).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        },
      );
      return { email, name, state: "new" }
    }
    return {user, state: "old"}
  }


}
