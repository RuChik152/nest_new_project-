import {Body, Controller, Get, Header, Param, Post, Put} from '@nestjs/common';
import {DevClientService} from './dev-client.service';
import {CreateDevClientDto} from './dto/create-dev-client.dto';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('dev-client')
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

 @ApiOkResponse({status: 200, description: 'Getting data from the settings file.'})
 @Get()
 @Header('Content-Type', 'application/json')
 async getDataFileSettings(){
      try {
          const getFile = await this.devClientService.getDataFile()
          return getFile;
      }catch (error){
          console.log('ERROR', error)
          return error
      }
 }

 @Put()
 @Header('Content-Type', 'application/json')
 async updateDataFile(@Body() settings: Object) {
     return await this.devClientService.putDataFile(settings)
 }

}
