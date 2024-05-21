import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Device, DeviceSchema } from "./entities/device.schema";
import { User, UserSchema } from "../user/entities/user.schema";
import { DeviceMiddleware } from "./device.middleware";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema }]),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }])
  ],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule implements NestModule{
   configure(consumer: MiddlewareConsumer): any {
     consumer
       .apply(DeviceMiddleware)
       .forRoutes({path: 'device/:deviceId/test', method: RequestMethod.ALL})
   }
}
