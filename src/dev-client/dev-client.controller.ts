import {Controller, Get, Post, Body, Patch, Param, Delete, Put} from '@nestjs/common';
import { DevClientService } from './dev-client.service';
import { CreateDevClientDto } from './dto/create-dev-client.dto';
import { UpdateDevClientDto } from './dto/update-dev-client.dto';

@Controller('dev-client')
export class DevClientController {
  constructor(private readonly devClientService: DevClientService) {}

  @Post()
  async createSettingsDocument(@Body() createGameSettings: CreateDevClientDto) {
    const createGameSettingsDocument = await this.devClientService.createDocumentSettings(createGameSettings);
    return createGameSettingsDocument;
  }

  @Get(':id')
  async getGameSettings(@Param('id') id: string){
    const gameSettings = await this.devClientService.getSettingsDataDocument(id);
    return gameSettings;
  }

  @Put(':id')
  async updateGameSetting(@Body() settings: CreateDevClientDto, @Param('id') id : string ) {
    const updateGameSettings = await this.devClientService.updateGameSettings(settings, id);
    return updateGameSettings;
  }


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDevClientDto: UpdateDevClientDto) {
  //   return this.devClientService.update(+id, updateDevClientDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.devClientService.remove(+id);
  // }
}
