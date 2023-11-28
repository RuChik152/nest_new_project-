import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.schema";
import { Device, DeviceSchema } from "../device/entities/device.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema },
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {
}
