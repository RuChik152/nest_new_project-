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

  async check(device: CreateDeviceDto, device_platform: string) {
    try {
      const filter: UpdateDeviceDto = { deviceId: device.deviceId };

      const findDevice = await this.deviceModel.findOne(filter);

      filter.platform = device_platform;

      if (findDevice === null) {
        const newDevice = await this.deviceModel.create(filter);
        return await this.deviceModel.findOne(
          { deviceId: newDevice.deviceId },
          'deviceId activateCode emojiCode -_id',
        );
      } else {
        if (findDevice.activateCode.length === 0) {
          await this.deviceModel.findOneAndUpdate({ deviceId: device.deviceId }, {
            $set: {platform: device_platform}
          })
          return await this.deviceModel
            .findOne({ deviceId: device.deviceId }, 'deviceId -_id')
            .populate({ path: 'user', select: 'email name platform -_id' });
        } else {
          await this.deviceModel.findOneAndUpdate({ deviceId: device.deviceId }, {
            $set: {platform: device_platform}
          })
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

  async update(device: CreateDeviceDto, data: UpdateDeviceDto, device_platform: string) {
    const filter: CreateDeviceDto = device;
    const {
      platform, 
      LEFT_GOLEM_ABLC_SKLS_SPEED_UP, 
      LEFT_GOLEM_ABLC_SKLS_UP_DMG,
      LEFT_GOLEM_ABLC_SKLS_RCCHT,
      LEFT_GOLEM_ABLC_SKLS_MGT,
      RIGHT_GOLEM_ABLC_SKLS_SPEED_UP,
      RIGHT_GOLEM_ABLC_SKLS_UP_DMG,
      RIGHT_GOLEM_ABLC_SKLS_RCCHT,
      RIGHT_GOLEM_ABLC_SKLS_MGT,
      ABLC_SKLS_FIRE,
      ABLC_SKLS_FIRE_TIME,
      ABLC_SKLS_HP,
      ABLC_SKLS_SHLD,
      ABLC_GLM_HP_UP,
      victory,
      ...update
    } : UpdateDeviceDto = data;
    const field =  "-_id -createdAt -updatedAt -__v";

    const replace: UpdateDeviceDto = {
      LEFT_GOLEM_ABLC_SKLS_SPEED_UP, 
      LEFT_GOLEM_ABLC_SKLS_UP_DMG,
      LEFT_GOLEM_ABLC_SKLS_RCCHT,
      LEFT_GOLEM_ABLC_SKLS_MGT,
      RIGHT_GOLEM_ABLC_SKLS_SPEED_UP,
      RIGHT_GOLEM_ABLC_SKLS_UP_DMG,
      RIGHT_GOLEM_ABLC_SKLS_RCCHT,
      RIGHT_GOLEM_ABLC_SKLS_MGT,
      ABLC_SKLS_FIRE,
      ABLC_SKLS_FIRE_TIME,
      ABLC_SKLS_HP,
      ABLC_SKLS_SHLD,
      ABLC_GLM_HP_UP,
      platform: device_platform,
      victory,
    }

    await this.deviceModel.findOneAndUpdate(filter, { 
      $inc: update, 
      $set: replace 
    });
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
