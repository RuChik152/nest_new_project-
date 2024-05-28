import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './entities/device.schema';
import { Model, QueryOptions } from "mongoose";
import { User, UserDocument } from "../user/entities/user.schema";

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async check(device: CreateDeviceDto) {
    try {
      const filter: UpdateDeviceDto = { deviceId: device.deviceId };

      const findDevice = await this.deviceModel.findOne(filter);

      if (findDevice === null) {
        const newDevice = await this.deviceModel.create(device);
        return await this.deviceModel.findOne(
          { deviceId: newDevice.deviceId },
          'deviceId activateCode emojiCode -_id',
        );
      } else {
        if (findDevice.activateCode.length === 0) {
          return await this.deviceModel
            .findOne({ deviceId: device.deviceId }, 'deviceId -_id')
            .populate({ path: 'user', select: 'email name platform -_id' });
        } else {
          return await this.deviceModel
            .findOne(
              { deviceId: device.deviceId },
              '-_id -createdAt -updatedAt -__v',
            )
            .populate({ path: 'user', select: 'email name platform -_id' })
            .populate({ path: 'left_golem', select: '-_id -createdAt -updatedAt -__v', populate: { path: 'device', select: '-_id -createdAt -updatedAt -__v'}})
            .populate({ path: 'right_golem', select: '-_id -createdAt -updatedAt -__v', populate: { path: 'device', select: '-_id -createdAt -updatedAt -__v'}})
        }
      }
    } catch (error) {
      return error;
    }
  }

  async update(device: CreateDeviceDto, data: UpdateDeviceDto) {
    const filter: CreateDeviceDto = device;
    const update: UpdateDeviceDto = data;
    const field =  "-_id -createdAt -updatedAt -__v";

    await this.deviceModel.findOneAndUpdate(filter, { $inc: update });
    return this.deviceModel.findOne(filter, field)

  }

  async deleteDevice(deviceDTO: UpdateDeviceDto) {
    try {
      const deleteDevice = await this.deviceModel
        .findOne({deviceId: deviceDTO.deviceId})
        .populate('user')
        .populate({path: 'left_golem', populate: {path:'device'}})
        .populate({path: 'right_golem', populate: {path: 'device'}})
      console.log('DATA', deleteDevice)
      if (deleteDevice) {
        if(deleteDevice.left_golem) {
          await this.deviceModel.findOneAndUpdate({deviceId: deleteDevice.left_golem.device.deviceId}, {$unset: {right_golem: 1}})
        }

        if (deleteDevice.right_golem){
          await this.deviceModel.findOneAndUpdate({deviceId: deleteDevice.right_golem.device.deviceId}, {$unset: {left_golem: 1}})
        }

        if (deleteDevice.user) {
          await this.userModel.findOneAndUpdate({email: deleteDevice.user.email}, { $unset: { device: 1 }})
        }

        const device = await this.deviceModel.findOneAndDelete({deviceId: deviceDTO.deviceId})

        return {
          status: 200,
          data: {
            error: "",
            device
          }
        }
      } else {
        return {
          status: 404,
          data: {
            error: "Not Found"
          }
        }
      }

    } catch (error) {
      return {
        status: 500,
        data: {
          error: error
        }
      }
    }
  }

}
