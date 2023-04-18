import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserVerifyDto } from './user_verify.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly httpService: HttpService,
  ) {}

  async getInfoUser(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async updateInfoUser(body) {
    await this.userModel.findOneAndUpdate({ _id: body.id }, body);
    const user = await this.userModel.findOne({ _id: body.id });
    return user;
  }

  async verifyUserOculus(body: UserVerifyDto) {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://graph.oculus.com/user_nonce_validate',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
        },
        data: {
          access_token: `OC|${process.env.APP_ID}|${process.env.APP_SECRET}`,
          nonce: `${body.nonce}`,
          user_id: `${body.userID}`,
        },
      });

      return response.data;
    } catch (error) {
      //TODO need create logger
      console.log('ERROR', error.response.data);
      return error.response.data;
    }
  }
}
