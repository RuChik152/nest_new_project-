import { Module } from '@nestjs/common';
import { DevClientService } from './dev-client.service';
import { DevClientController } from './dev-client.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {GameSetting, GameSettingsSchema} from "./dev-client.chema";

@Module({
  imports: [
      MongooseModule.forFeature([{name: GameSetting.name, schema: GameSettingsSchema}])
  ],
  controllers: [DevClientController],
  providers: [DevClientService]
})
export class DevClientModule {}
