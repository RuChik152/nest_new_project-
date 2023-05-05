import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { MailerService } from "@nestjs-modules/mailer";
import { changeTamplatePlatfoprm } from "./mail.utils";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserMailerDocument } from "./mail.schema";
import { Model } from "mongoose";
import { CreateMailDto } from "./dto/create-mail.dto";


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService, @InjectModel(User.name) private mailerUserModel: Model<UserMailerDocument>) {}

  async sendMail() {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtppro.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: 'info@belivr.tech',
          pass: 'Karga@Beli5R',
        },
      });
      const msg = await transporter.sendMail({
        from: '"Fred Foo 👻" <info@belivr.tech>',
        to: "info@nchernov.ru",
        subject: "Test Nest NODEMAILER",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });

      console.log("Message sent: %s", msg.messageId);
      console.log("Message INFO: ", msg);

      return msg
    } catch (error) {
      console.log("Main MailService ERROR: ", error);
      return error
    }

  }

  async creatUserData(datauser: CreateMailDto){
    console.log('data user', datauser)
    try {
      const user = await this.mailerUserModel.findOne({
        email: datauser.email
      })

      console.log('USER', user)

      if(!user) {
        return await this.mailerUserModel.create(datauser)
      } else {
        return user
      }

    } catch (error) {
      console.log('CreatUserData MailService ERROR: ', error)
      return error
    }

  }

  async sendUserSelectPlatform(datauser: CreateMailDto ) {
    try {
      const checkSend = await this.mailerUserModel.findOne({email: datauser.email})
      if(checkSend.sendstatus !== true) {
        const user = await this.mailerUserModel.findOneAndUpdate({
          email: datauser.email
        }, {platform: datauser.platform, sendstatus: true})
        if(user) {
          await this.mailerService.sendMail({
            to: datauser.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Welcome to Alpha Test!',
            template: changeTamplatePlatfoprm(datauser.platform), // `.hbs` extension is appended automatically
            attachments: [],
            // headers: {
            //   'x-image-url': 'https://avatars.mds.yandex.net/get-yapic/63032/4a8qLnUCKNaWmISNMySagO9N8Q-1/islands-retina-50',
            // },
            context: {
              name: datauser.name,
            },
          })
          return {status: 250}
        }
      }
      return {status: 250}
    } catch (error) {
      console.log('SendUserSelectPlatform MailService ERROR: ', error)
      return error
    }
  }

  async sendRepateEmail(datauser: CreateMailDto) {
    try {
      await this.mailerService.sendMail({
        to: datauser.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Alpha Test!',
        template: changeTamplatePlatfoprm(datauser.platform), // `.hbs` extension is appended automatically
        attachments: [],
        // headers: {
        //   'x-image-url': 'https://avatars.mds.yandex.net/get-yapic/63032/4a8qLnUCKNaWmISNMySagO9N8Q-1/islands-retina-50',
        // },
        context: {
          name: datauser.name,
        },
      })
      return { status: 250 }
    } catch (error) {
      console.log('SendRepateEmail MailService ERROR: ', error)
      return error
    }
  }

}
