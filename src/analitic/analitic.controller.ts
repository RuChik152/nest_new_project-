import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnaliticService } from './analitic.service';
import { CreateAnaliticDto } from './dto/create-analitic.dto';
import { UpdateAnaliticDto } from './dto/update-analitic.dto';

@Controller('analitic')
export class AnaliticController {
  constructor(private readonly analiticService: AnaliticService) {}

  @Post()
  async sendDataUser(@Body() userData: any) {
    const sendUserData = await this.analiticService.writeAnalitycDb(userData);
    return sendUserData;
  }

  @Post('write')
  async writeDataUser(@Body() userData: any) {
    const writeUserData = await this.analiticService.writeAnalitycDb(userData);
    return writeUserData;
  }
  //
  // @Post()
  // create(@Body() createAnaliticDto: CreateAnaliticDto) {
  //   return this.analiticService.create(createAnaliticDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.analiticService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.analiticService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnaliticDto: UpdateAnaliticDto) {
  //   return this.analiticService.update(+id, updateAnaliticDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.analiticService.remove(+id);
  // }
}
