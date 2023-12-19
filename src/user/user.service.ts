import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Error, Model, QueryOptions } from "mongoose";
import { Device, DeviceDocument } from '../device/entities/device.schema';
import { UpdateDeviceDto } from "../device/dto/update-device.dto";
import { GolemType } from "../device/types/device.types";

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
      activateCode: deviceDTO.activateCode.toUpperCase(),
    });
    if(device) {
      const userUpdate = await this.userModel.findOneAndUpdate(
        { email: userDTO.email },
        { device: device },
        { new: true },
      );
      const updateDevice = await this.deviceModel.findOneAndUpdate(
        { activateCode: deviceDTO.activateCode },
        {
          user: userUpdate,
        },
        { new: true },
      );

    }

    return await this.getUsers(userDTO)

  }

  /*
   * Привязка своего шлема к шлему друга, тем самым для друга это будет правый голем, для пользователя левый голем
   */
  async bindingGolem(userDTO: UpdateUserDto, deviceDTO: UpdateDeviceDto) {
    try {
      const user = await this.userModel.findOne( { email: userDTO.email }).populate('device');
      const friendDevice = await this.deviceModel.findOneAndUpdate({ activateCode: deviceDTO.activateCode },{ right_golem: user }, {new: true}).populate('user');

      const myDevice = await this.deviceModel.findOneAndUpdate(
        {
          deviceId: user.device.deviceId
        },
        {
          left_golem: friendDevice.user
        },
        {
          new: true
        })

      return {
        friend: friendDevice,
        my: myDevice
      }

    } catch (error) {
      return error
    }
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
      .filter((el, index) => {
        console.log(`ELEMENT ${index}:`, el)
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

  async deleteGolemBinding(deviceDTO: UpdateDeviceDto, golem: GolemType) {
    try {
      const myDevice = await this.deviceModel
        .findOne({deviceId: deviceDTO.deviceId})
        .populate({ path: 'user', select: 'email name platform -_id' })
        .populate({ path: 'left_golem', select: '-_id -createdAt -updatedAt -__v', populate: { path: 'device', select: '-_id -createdAt -updatedAt -__v'}})
        .populate({ path: 'right_golem', select: '-_id -createdAt -updatedAt -__v', populate: { path: 'device', select: '-_id -createdAt -updatedAt -__v'}})

      switch (golem) {
        case "right_golem":
          await this.deviceModel.findOneAndUpdate({deviceId: myDevice.right_golem.device.deviceId}, { $unset: { left_golem: 1 } });
          return await this.deviceModel.findOneAndUpdate({deviceId: deviceDTO.deviceId}, { $unset: { right_golem: 1 } })
        case "left_golem":
          await this.deviceModel.findOneAndUpdate({deviceId: myDevice.left_golem.device.deviceId}, { $unset: { right_golem: 1 } });
          return await this.deviceModel.findOneAndUpdate({deviceId: deviceDTO.deviceId}, { $unset: { left_golem: 1 } })
      }



    }catch (error) {
      return error
    }
  }
}
