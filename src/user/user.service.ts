import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Model, QueryOptions } from 'mongoose';
import { Device, DeviceDocument } from '../device/entities/device.schema';
import { UpdateDeviceDto } from "../device/dto/update-device.dto";

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
        .findOne({ email: user.email })
        .populate('device');
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
  async bindingDevice(userDTO: UpdateUserDto, deviceDTO: UpdateDeviceDto) {
    const device = await this.deviceModel.findOne({
      activateCode: deviceDTO.activateCode,
    });
    const userUpdate = await this.userModel.findOneAndUpdate(
      { email: userDTO.email },
      { device: device },
      { new: true },
    );
    const updateDevice = await this.deviceModel.findOneAndUpdate(
      { activateCode: deviceDTO.activateCode },
      {
        user: userUpdate,
        activateCode: '',
      },
      { new: true },
    );
    //return this.userModel.findOne({ email: user.email }).populate('device');

    return await this.getUsers(userDTO)
  }

  /*
   * Получение данных о пользователе
   */
  async getUser(user: UpdateUserDto) {
    try {
      return await this.userModel
        .findOne({ email: user.email }, '-createdAt -updatedAt -__v -_id')
        .populate({
          path: 'device',
          select: '-_id -__v -createdAt -updatedAt -user',
        })
        .lean();
    } catch (error) {
      return error;
    }
  }

  /*
   * Получение, сортировка данных для турнироной таблицы
   */
  async getUsers(dataUser: UpdateUserDto) {
    const user = await this.getUser(dataUser);
    const usersList = await this.userModel
      .find({}, '-createdAt -updatedAt -__v -_id')
      .populate({
        path: 'device',
        select: '-_id -__v -createdAt -updatedAt -user',
      })
      .lean();

    function addPosition(user: any, list: any[]) {
      user.position = list.findIndex((el) => el.email === user.email) + 1;
      return user;
    }

    const listUser = usersList
      .filter((el) => {
        return el.hasOwnProperty('device') && el.device.hasOwnProperty('score');
      })
      .sort((a, b) => {
        return b.device.score - a.device.score;
      });

    const userData = addPosition(user, listUser);

    return {
      list: listUser,
      user: userData,
    };
  }
}
