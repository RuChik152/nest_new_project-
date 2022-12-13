import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DownloadModule } from './download/download.module';
import { UserModule } from './user/user.module';

process.env;

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `${process.env.DB_METHOD}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/belivr_karga`,
    ),
    DownloadModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
