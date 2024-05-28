import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ISendMailOptions, MailerService } from "@nestjs-modules/mailer";
import { changeTamplatePlatfoprm } from "./mail.utils";
import { InjectModel } from "@nestjs/mongoose";
import { MailUser, UserMailerDocument } from "./mail.schema";
//import {User, UserDocument} from "../user/entities/user.schema"
import { Model } from "mongoose";
import { CreateMailDto } from "./dto/create-mail.dto";
import { UpdateMailDto } from "./dto/update-mail.dto";
import { SentMessageInfo } from "nodemailer";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(MailUser.name) private mailerUserModel: Model<UserMailerDocument>,
  ) {}

  async sendMail() {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtppro.zoho.com',
        port: 465,
        secure: true,
        auth: {
          user: 'info@belivr.tech',
          pass: 'Karga@Beli5R',
        },
      });
      const msg = await transporter.sendMail({
        from: '"info 👻" <info@belivr.tech>',
        to: 'info@nchernov.ru',
        subject: 'Test Nest NODEMAILER',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
      });

      console.log(`[${new Date().toJSON()}] Message sent: %s`, msg.messageId);
      console.log(`[${new Date().toJSON()}] Message INFO: `, msg);

      return msg;
    } catch (error) {
      console.log(`[${new Date().toJSON()}] Main MailService ERROR: `, error);
      return error;
    }
  }

  async sendBugReport(data: UpdateMailDto, file?: Express.Multer.File) {
    const configEmail:ISendMailOptions =  {
      to: "info@belivr.tech",
      from: "info@belivr.tech",
      subject: data.subject,
      text: `\n
      Указаный Email: ${data.email}\n
      Указанный ID Устройства: ${data.deviceId}\n
      Сообщение пользователя: ${data.text}\n`,
    }

    if (file) {
      configEmail.attachments = [
        {
          filename: file.originalname,
          content: file.buffer
        }
      ]
    }

    try {
      const sendEmail = await this.mailerService.sendMail(configEmail)

      return {
        status: 250,
        data: {
          error:"",
          ...sendEmail
        }
      }
    }catch (error) {
      console.log(error)
      return {
        status: 404,
        data: {
          error: "Sending error, please try again later",
          ...error
        }
      }
    }

  }

  // async creatUserData(datauser: CreateMailDto) {
  //   try {
  //     const user = await this.mailerUserModel.findOne({
  //       email: datauser.email,
  //     });
  //
  //
  //     if (!user) {
  //       return await this.mailerUserModel.create(datauser);
  //     } else {
  //       await this.mailerUserModel.findOneAndUpdate({ email: datauser.email }, { $addToSet: { auth_data: datauser.auth_data} })
  //       return user;
  //     }
  //   } catch (error) {
  //     console.log(`[${new Date().toJSON()}] CreatUserData MailService ERROR: `, error);
  //     return error;
  //   }
  // }
  //
  // async sendUserSelectPlatform(datauser: CreateMailDto) {
  //   try {
  //     const checkSend = await this.mailerUserModel.findOne({
  //       email: datauser.email,
  //     });
  //     if (checkSend.sendstatus !== true) {
  //       const email = await this.mailerService.sendMail({
  //         to: datauser.email,
  //         subject: 'Welcome to Alpha Test!',
  //         template: changeTamplatePlatfoprm(datauser.platform), // `.hbs` extension is appended automatically
  //         attachments: [],
  //         headers: [
  //           {
  //             key: 'X-Image-Url',
  //             value:
  //               'https://img-fotki.yandex.ru/get/15599/210509346.df/0_19b12b_992ece27_XS.png',
  //           },
  //         ],
  //         context: {
  //           name: datauser.name,
  //         },
  //       });
  //       console.log(`[${new Date().toJSON()}] SEND EMAIL from : ${datauser.email}: `, email.response);
  //       if (email) {
  //         await this.mailerUserModel.findOneAndUpdate(
  //           { email: datauser.email },
  //           { platform: datauser.platform, sendstatus: true },
  //         );
  //       }
  //       return { status: 250 };
  //     }
  //     return { status: 250 };
  //   } catch (error) {
  //     await this.mailerUserModel.findOneAndUpdate(
  //       { email: datauser.email },
  //       { platform: datauser.platform, sendstatus: false }
  //     )
  //     console.log(`[${new Date().toJSON()}] SendUserSelectPlatform MailService ERROR: `, error);
  //     return error;
  //   }
  // }
  //
  // async sendRepateEmail(datauser: CreateMailDto) {
  //   try {
  //     console.log(`[${new Date().toJSON()}] SEND REPEAT MASSAGE: `, datauser);
  //     await this.mailerService.sendMail({
  //       to: datauser.email,
  //       subject: 'Welcome to Alpha Test!',
  //       template: changeTamplatePlatfoprm(datauser.platform), // `.hbs` extension is appended automatically
  //       attachments: [],
  //       context: {
  //         name: datauser.name,
  //       },
  //     });
  //     return { status: 250 };
  //   } catch (error) {
  //     console.log(` [${new Date().toJSON()}] SendRepateEmail MailService ERROR: `, error);
  //     return error;
  //   }
  // }
  //
  // consentNewsLetter(user: string | string[]) {
  //
  // }
  //
  // async getUser(id: string) {
  //     try {
  //       return await this.mailerUserModel.findOne({
  //         'auth_data.user_id': { $eq: id }
  //       });
  //     } catch (error) {
  //       console.log(`[${new Date().toJSON()}] GetUser MailService ERROR: `, error);
  //     }
  // }
  //
  // async deleteUser(id:string) {
  //   try {
  //     return await this.mailerUserModel.deleteOne({
  //       'auth_data.user_id': { $eq: id }
  //     })
  //   } catch (error) {
  //     console.log(`[${new Date().toJSON()}] DeleteUser MailService ERROR: `, error);
  //   }
  // }

}
