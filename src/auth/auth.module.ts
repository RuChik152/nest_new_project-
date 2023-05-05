import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, AdminUserSchema } from './auth.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
