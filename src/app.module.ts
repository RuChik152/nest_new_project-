import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DownloadModule } from './download/download.module';
import { UserModule } from './user/user.module';
import { DevClientModule } from './dev-client/dev-client.module';
import { AnaliticModule } from './analitic/analitic.module';
import {MulterModule} from "@nestjs/platform-express";
import { HistoryModule } from './history/history.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import * as process from "process";

process.env;

@Module({
  imports: [
    MulterModule.register({
      dest: process.env.PATH_STORAGE_HISTORYS
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.DB_METHOD}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/belivr_karga`,
    ),
    DownloadModule,
    // UserModule,
    DevClientModule,
    AnaliticModule,
    HistoryModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
