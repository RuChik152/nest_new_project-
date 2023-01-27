import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DevClientService } from './dev-client.service';
import { CreateDevClientDto } from './dto/create-dev-client.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('dev-client')
@Controller('dev-client')
export class DevClientController {
  constructor(private readonly devClientService: DevClientService) {}

  @Get('watch')
  @ApiOkResponse({ description: 'Returns the response in JSON', status: 200 })
  @Header('Content-Type', 'application/json')
  async getWatchData() {
    return await this.devClientService.watchDataFile();
  }

  @Post()
  async createSettingsDocument(@Body() createGameSettings: CreateDevClientDto) {
    return await this.devClientService.createDocumentSettings(
      createGameSettings,
    );
  }

  @Get(':id')
  async getGameSettings(@Param('id') id: string) {
    return await this.devClientService.getSettingsDataDocument(id);
  }

  @Put(':id')
  async updateGameSetting(
    @Body() settings: CreateDevClientDto,
    @Param('id') id: string,
  ) {
    return await this.devClientService.updateGameSettings(settings, id);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Getting data from the settings file.',
  })
  @Get()
  @Header('Content-Type', 'application/json')
  async getDataFileSettings() {
    try {
      return await this.devClientService.getDataFile();
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  }

  @Put()
  @Header('Content-Type', 'application/json')
  async updateDataFile(@Body() settings: Record<string, unknown>) {
    return await this.devClientService.putDataFile(settings);
  }
}
