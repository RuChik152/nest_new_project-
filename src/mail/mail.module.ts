import { Global, Module } from "@nestjs/common";
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from "@nestjs-modules/mailer";
import { resolve } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MongooseModule } from "@nestjs/mongoose";
import { MailerUserSchema, MailUser } from "./mail.schema";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: "smtppro.zoho.com",
          port: 465,
          secure: true,
          auth: {
            user: 'info@belivr.tech',
            pass: 'Karga@Beli5R',
          },
        },
        defaults: {
          from: `info@belivr.tech`
        },
        template: {
          dir: resolve(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options : {
            strict: true
          }
        }
      })

    }),
    MongooseModule.forFeature([
      {name: MailUser.name, schema: MailerUserSchema}
    ]),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}