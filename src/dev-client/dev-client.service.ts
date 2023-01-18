import { Injectable } from '@nestjs/common';
import { CreateDevClientDto } from './dto/create-dev-client.dto';
import { UpdateDevClientDto } from './dto/update-dev-client.dto';
import {InjectModel} from "@nestjs/mongoose";
import {GameSetting, GameSettingDocument} from "./dev-client.chema";
import {Model} from "mongoose";



@Injectable()
export class DevClientService {
  constructor(@InjectModel(GameSetting.name) private devGameSettingModel: Model<GameSettingDocument>) {}


  async createDocumentSettings(createDevClientDto: CreateDevClientDto){
      const createDocumentSettings = await this.devGameSettingModel.create(createDevClientDto);
      return createDocumentSettings;
  }

  async getSettingsDataDocument(documentId: string) : Promise<GameSetting> {
    const { healthPoint, damage, shieldPoint } = await this.devGameSettingModel.findOne({_id: documentId})
    return { healthPoint, damage, shieldPoint };
  }

  async updateGameSettings(gameSettings, id) {
    await this.devGameSettingModel.findOneAndUpdate({_id: id}, gameSettings);
    const settings = await this.getSettingsDataDocument(id);
    return settings;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} devClient`;
  // }

  // update(id: number, updateDevClientDto: UpdateDevClientDto) {
  //   return `This action updates a #${id} devClient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} devClient`;
  // }
}
