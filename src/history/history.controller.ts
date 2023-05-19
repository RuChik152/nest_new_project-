import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Put, Delete
} from "@nestjs/common";
import { HistoryService } from "./history.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, filePathImg, updatehistory } from "./history.utils";
import { CreateHistoryDto } from "./dto/create-history.dto";


@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('file/:name')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: filePathImg,
      filename: editFileName
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('name') name: string){
    try {
        await this.historyService.hash(name)
       return {file, name}
    }catch (error) {
      console.log('ERROR: ', error)
      return error
    }

  }

  @Post('creat')
  async creatHistory(@Body() data: any) {
    try {
      return await this.historyService.creat(data)
    } catch (error) {
      console.log('ERROR: ', error)
      return error
    }
  }

  @Get('hash/:nameHistory')
  async getHashSum(@Param('nameHistory') nameHistory: string){
    return await this.historyService.getHash(nameHistory);
  }

  @Put('hash/:nameHistory')
  updateHashSum(@Param('nameHistory') nameHistory: string){
    return this.historyService.updateHash(nameHistory)
  }

  @Put('update/:name/:text/:oldname')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: updatehistory,
      filename: editFileName
    })
  }))
  async updateHistory(@UploadedFile() file: Express.Multer.File, @Param() params: CreateHistoryDto ){
    try {
      const newHash =  await this.historyService.updateFileHistory(params.name, params.text)
      const data = {
        newHash,
        name: params.name,
        oldname: params.oldname,
      }
      return data
    }catch (error) {
      console.log('UpdateHistory HistoryController ERROR: ', error)
      return error
    }
  }

  @Delete(':name')
  async deleteHistory(@Param() name: string) {
    try {
      console.log('TEST DELETE ENDPOINT: ', name);
    } catch (error) {
      console.log('UpdateHistory HistoryController ERROR: ', error);
      return error
    }
  }

  @Get('imag/:img')
  @Header('content-type','image/*')
  getImage(@Param('img') img: string, @Res({ passthrough: true }) response: any) {
    const file = this.historyService.getImageData(img);
    return new StreamableFile(file);
  }


  @Get('resources')
  @Header('content-type','application/zip')
  async getResources(){
    console.log(`GET REQUEST  /history/resources  ${new Date()}`)
    const file = await this.historyService.getAllDataResources()
    console.log(`GET RESPONSE  /history/resources ${new Date()}`, file)
    return new StreamableFile(file);

  }

  @Put('resources')
  @Header('content-type','application/zip')
  async updateDiffResource(@Body() json: object) {
    console.log(`PUT REQUEST  /history/resources  ${new Date()}`)
    const file = await this.historyService.diffResource(json)
    console.log(`PUT RESPONSE  /history/resources  ${new Date()}`, file)
    return new StreamableFile(file);
  }

  @Put('resources/diff')
  @Header('content-type','application/json')
  async createDiffResourceJson() {
    return this.historyService.getDiffResourceMap()
  }


  @Get('zip')
  async createArchive() {
    await this.historyService.creatGzip()
  }


}
