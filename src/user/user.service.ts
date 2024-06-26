import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.schema';
import { Error, Model, QueryOptions, Schema, Types } from "mongoose";
import { Device, DeviceDocument } from '../device/entities/device.schema';
import { UpdateDeviceDto } from "../device/dto/update-device.dto";
import { GolemType } from "../device/types/device.types";
import { use } from "passport";



enum DO_SRVL {
  YES = 1,
  NO = 0,
  NIL = 2,
}


@Injectable()
export class UserService {

  private checkStatus: boolean

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
    user.email = user.email.toLowerCase()
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
  async update(data: UpdateUserDto, email: string) {

    const regExp = new RegExp('^.*@.*\\..*','ig')
    const checkEmail = regExp.test(email)
    if (checkEmail){
      try {
        const filter: UpdateUserDto = { email: email };
        const update: UpdateUserDto = data;
        const options: QueryOptions = {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        };
        return {
          status: 200,
          data: {
            error: "",
            ... await this.userModel.findOneAndUpdate(filter, update, options).lean()
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
    } else {
      return {
        status: 400,
        data: {
          error: "Incorrect email address",
        }

      }
    }


  }

  /*
   * Привязка устройства к аккаунту пользователя
   */
  async bindingDevice(userDTO: UpdateUserDto, deviceDTO: UpdateDeviceDto) {

    userDTO.email = userDTO.email.toLowerCase()
    let device: any;

    if(deviceDTO.activateCode) {
      device = await this.deviceModel.findOne({
        activateCode: deviceDTO.activateCode.toUpperCase(),
      });
    } else if (deviceDTO.emojiCode) {
      device = await this.deviceModel.findOne({
        emojiCode: deviceDTO.emojiCode,
      });
    } else  {
      return {
        status: 404,
        data: {
          error: "Device Not Found"
        }
      }
    }

    if(device) {
      if(device.user) {
        return {
          status: 400,
          data: {
            error: "The user already has a binding"
          }
        }
      }
      else {


        const userUpdate = await this.userModel.findOneAndUpdate(
          { email: userDTO.email },
          { device: device },
          { new: true },
        );

        if(deviceDTO.activateCode) {


          let do_srvl: number

          const device = await this.deviceModel.findOne({ activateCode: deviceDTO.activateCode.toUpperCase() })
          if (device.SRVL === 0){
            do_srvl = DO_SRVL.YES
          } else if (device.SRVL > 0) {
            do_srvl = DO_SRVL.NO
          } else {
            do_srvl = DO_SRVL.NIL
          }


          await this.deviceModel.findOneAndUpdate(
            { activateCode: deviceDTO.activateCode.toUpperCase() },
            {
              DO_SRVL: do_srvl,
              user: userUpdate,
            },
            { new: true },
          );
        } else if (deviceDTO.emojiCode) {

          
          let do_srvl: number

          const device = await this.deviceModel.findOne({ emojiCode: deviceDTO.emojiCode })
          if (device.SRVL === 0){
            do_srvl = DO_SRVL.YES
          } else if (device.SRVL > 0) {
            do_srvl = DO_SRVL.NO
          } else {
            do_srvl = DO_SRVL.NIL
          }

          await this.deviceModel.findOneAndUpdate(
            { emojiCode: deviceDTO.emojiCode },
            {
              DO_SRVL: do_srvl,
              user: userUpdate,
            },
            { new: true },
          );
        } else  {
          return {
            status: 404,
            data: {
              error: "Device Not Found"
            }
          }
        }
        // const updateDevice = await this.deviceModel.findOneAndUpdate(
        //   { activateCode: deviceDTO.activateCode.toUpperCase() },
        //   {
        //     user: userUpdate,
        //   },
        //   { new: true },
        // );

        const dataUsers = await this.getUsers(userDTO)

        return {
          status: 200,
          data: {
            error: "",
            ...dataUsers
          }
        }

      }
    }
  }

  /*
   * Привязка своего шлема к шлему друга, тем самым для друга это будет правый голем, для пользователя левый голем
   */
  async bindingGolem(userDTO: UpdateUserDto, deviceDTO: UpdateDeviceDto) {

    try {
      const user = await this.userModel.findOne( { email: userDTO.email }).populate('device');
      const checkBindingUserDevice = await this.deviceModel.findOne({ activateCode: deviceDTO.activateCode.toUpperCase()}).populate('user').populate({path: "left_golem", populate:{path: "device"}});
      await this.checkFriendGolem(user, checkBindingUserDevice)
      console.log("TEST this.checkStatus: =>", this.checkStatus)
      if (!this.checkStatus){
        if(checkBindingUserDevice.user) {
          if(!checkBindingUserDevice.right_golem) {
            const friendDevice = await this.deviceModel.findOneAndUpdate(
              { activateCode: deviceDTO.activateCode.toUpperCase() },
              { right_golem: user },
              {new: true})
              .populate('user');
            const myDevice = await this.deviceModel.findOneAndUpdate(
              { deviceId: user.device.deviceId },
              { left_golem: friendDevice.user },
              { new: true })
            return {
              status: 200,
              data: {
                error: "",
                friend: friendDevice,
                my: myDevice
              }
            }
          }
          else {
            return {
              status: 400,
              data: {
                error: "A friend's account already has a linked golem",
                friend: await this.deviceModel.findOne({ activateCode: deviceDTO.activateCode.toUpperCase()}),
                my: await this.deviceModel.findOne({ deviceId: user.device.deviceId })
              }
            }
          }
        } else {
          return {
            status: 404,
            data: {
              error: "The friend's account has not been activated. He needs to activate a friend's account before tying a golem to it.",
              friend: await this.deviceModel.findOne({ activateCode: deviceDTO.activateCode.toUpperCase()}),
              my: await this.deviceModel.findOne({ deviceId: user.device.deviceId }),
            }
          }
        }
      } else {
        return {
          status: 403,
          data: {
            error: "It is impossible that when activating the golem, there are user matches in the connection chain.",
            friend: checkBindingUserDevice,
            my: user
          }
        }
      }


    } catch (error) {
      return {
        status: 500,
        data: {
          error: `SERVER ERROR: ${error}`,
          friend: null,
          my: null
        }
      }
    }
  }

  async checkFriendGolem(user: UpdateUserDto | any, device: UpdateDeviceDto | any) {
    console.log("checkFriendGolem: ",device)
    if(device.left_golem) {
      if (device.left_golem.email !== user.email){
        const newDevice = await this.deviceModel.findOne({deviceId: device.left_golem.device.deviceId}).populate('user').populate({path: "left_golem", populate:{path: "device"}});
        await this.checkFriendGolem(user, newDevice)
      } else  {
        this.checkStatus = true
        return false
      }
    } else {
      this.checkStatus = false
      return true
    }
  }

  /*
   * Получение данных о пользователе
   */
  async getUser(user: UpdateUserDto) {
    try {
      return await this.userModel
        .findOne({ email: user.email }, '-createdAt -updatedAt -__v')
        .populate({
          path: 'device',
          select: '-__v -createdAt -updatedAt -user',
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
      .find({}, '-createdAt -updatedAt -__v -name -platform -sendstatus -auth_data -news -email')
      .populate({
        path: 'device',
        select: ' -__v -createdAt -updatedAt -user',
      })
      .lean();

    function addPosition(user: any, list: any[]) {
      user.position = list.findIndex((el) => el.email === user.email) + 1;
      return user;
    }

    const listUser = usersList
      .filter((el, index) => {
        return el.hasOwnProperty('device') && el.device !== null && el.device.hasOwnProperty('score');
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

  /*
   * Отвязать голема
   */
  async deleteGolemBinding(deviceDTO: UpdateDeviceDto, golem: GolemType) {
    try {
      const myDevice = await this.deviceModel
        .findOne({deviceId: deviceDTO.deviceId})
        .populate({ path: 'user', select: 'email name platform' })
        .populate({ path: 'left_golem', select: ' -createdAt -updatedAt -__v', populate: { path: 'device', select: ' -createdAt -updatedAt -__v'}})
        .populate({ path: 'right_golem', select: ' -createdAt -updatedAt -__v', populate: { path: 'device', select: ' -createdAt -updatedAt -__v'}})

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

 /*
  * Удаление привязки шлема к аккаунту.
  */
  async deleteBinding(userDTO: UpdateUserDto) {
    try {
    const user = await this.userModel.findOne({email: userDTO.email}).populate({path: 'device', select: 'deviceId _id'})

      await this.deviceModel.findOneAndUpdate({right_golem: user._id}, {$unset: {right_golem: 1}})
      await this.deviceModel.findOneAndUpdate({left_golem: user._id}, {$unset: {left_golem: 1}})

      if(user.device && user.device.deviceId) {
        await this.deviceModel.findOneAndUpdate({deviceId: user.device.deviceId}, {$unset: {user: 1, left_golem: 1, right_golem: 1}})
        await this.userModel.findOneAndUpdate({email: userDTO.email}, {$unset: {device: 1}})
        return {
          status: 200,
          error: "",
        }
      } else {
        return {
          status: 404,
          error: "Device not found",
        }
      }
    } catch (error) {
      return {
        status: 500,
        error: error
      }
    }
  }
}
