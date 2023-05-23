import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { AdminPanelUser, AdminPanelUserSchema } from "./auth.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: AdminPanelUser.name, schema: AdminPanelUserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
