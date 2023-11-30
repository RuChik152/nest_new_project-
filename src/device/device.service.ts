import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './entities/device.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async check(device: CreateDeviceDto) {
    try {
      const filter: UpdateDeviceDto = { deviceId: device.deviceId };

      const findDevice = await this.deviceModel.findOne(filter);

      if (findDevice === null) {
        const newDevice = await this.deviceModel.create(device);
        return await this.deviceModel.findOne(
          { deviceId: newDevice.deviceId },
          'deviceId activateCode -_id',
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
              'deviceId activateCode -_id',
            )
            .populate({ path: 'user', select: 'email name platform -_id' });
        }
      }
    } catch (error) {
      return error;
    }
  }
}
