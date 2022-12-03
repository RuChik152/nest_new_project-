import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://RuChik152:Revenger413321337@cluster0.ps2kvxk.mongodb.net`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
