import { Injectable } from '@nestjs/common';
import { readFile, watch, writeFile } from 'node:fs/promises';
import { resolve } from 'path';
import { CreateDevClientDto } from './dto/create-dev-client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GameSetting, GameSettingDocument } from './dev-client.chema';
import { Model } from 'mongoose';

@Injectable()
export class DevClientService {
  constructor(
    @InjectModel(GameSetting.name)
    private devGameSettingModel: Model<GameSettingDocument>,
  ) {}

  async createDocumentSettings(createDevClientDto: CreateDevClientDto) {
    return await this.devGameSettingModel.create(createDevClientDto);
  }

  async getSettingsDataDocument(documentId: string): Promise<GameSetting> {
    const { healthPoint, damage, shieldPoint } =
      await this.devGameSettingModel.findOne({ _id: documentId });
    return { healthPoint, damage, shieldPoint };
  }

  async updateGameSettings(gameSettings, id) {
    await this.devGameSettingModel.findOneAndUpdate({ _id: id }, gameSettings);
    return await this.getSettingsDataDocument(id);
  }

  async getDataFile() {
    const pathFile = resolve(
      process.cwd(),
      'mock_data',
      'gameSettings.json',
    );
    return await readFile(pathFile, { encoding: 'utf-8' });
  }

  async putDataFile(data) {
    const pathFile = resolve(
      process.cwd(),
      'mock_data',
      'gameSettings.json',
    );
    const newData = data;
    const currentTime = newData.time;
    await writeFile(
      pathFile,
      JSON.stringify(Object.assign(newData, { time: currentTime })),
      { encoding: 'utf-8' },
    );
    return await readFile(pathFile, { encoding: 'utf-8' });
  }

  async watchDataFile() {
    const ac = new AbortController();
    const { signal } = ac;
    setTimeout(() => ac.abort(), 100000);
    const pathFile = resolve(
      process.cwd(),
      'mock_data',
      'gameSettings.json',
    );
    try {
      const watcher = watch(pathFile, { signal });
      for await (const event of watcher) {
        console.log(event);
        return this.getDataFile();
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      throw err;
    }
  }
}
