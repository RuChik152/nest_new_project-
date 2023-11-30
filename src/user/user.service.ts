import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Model, QueryOptions } from 'mongoose';
import { Device, DeviceDocument } from '../device/entities/device.schema';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Device.name)
    private deviceModel: Model<DeviceDocument>,
  ) {}

  /*
   * Проверка пользователя, если пользователя нет, то создаетьсяв БД,
   * если есть то отдаеться найденный
   */
  async checkUser(user: CreateUserDto) {
    try {
      const check = await this.userModel
        .findOne({email: user.email}).populate("device");
      if (check === null) {
        return await this.userModel.create(user);
      } else {
        return check;
      }
    } catch (error) {
      return error;
    }
  }

  /*
   * Обновление данных пользователя
   */
  async update(user: UpdateUserDto) {
    try {
      const filter: UpdateUserDto = { email: user.email };
      const update: UpdateUserDto = user;
      const options: QueryOptions = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      return await this.userModel.findOneAndUpdate(filter, update, options);
    } catch (error) {
      return await error;
    }
  }

  /*
   * Привязка устройства к аккаунту пользователя
   */
  async bindingDevice(email: string, activateCode: string) {
    const device = await this.deviceModel.findOne({
      activateCode: activateCode,
    });
    const userUpdate = await this.userModel.findOneAndUpdate(
      { email: email },
      { device: device },
      { new: true },
    );
    const updateDevice = await this.deviceModel.findOneAndUpdate(
      { activateCode: activateCode },
      {
        user: userUpdate,
        activateCode: '',
      },
      { new: true },
    );
    return this.userModel.findOne({email: email}).populate("device");
  }

  /*
   * Получение данных о пользователе
   */
  async getUser(user: UpdateUserDto) {
    try {
      return await this.userModel
        .findOne({ email: user.email }, "-createdAt -updatedAt -__v")
        .populate({ path: 'device', select: 'deviceId -_id' });
    } catch (error) {
      return error;
    }
  }
}
