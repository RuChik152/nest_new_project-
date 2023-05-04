import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"
import { MailerService } from "@nestjs-modules/mailer";
import { resolve } from "path";


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

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

  async sendUserConfirmation() {

    return await this.mailerService.sendMail({
      to: 'nazarikov@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Our App!',
      template: './template', // `.hbs` extension is appended automatically
      attachments:[
        {
          filename: 'banner.jpg',
          // path: '../../images/cat.png',
          path: resolve(__dirname, 'images', 'banner.jpg'),
          cid: 'banner'
        }
      ],
      context: { // ✏️ filling curly brackets with content
        name: 'NIKITA',
      },
    });
  }
}
