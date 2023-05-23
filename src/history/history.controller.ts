import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Request,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { HistoryService } from "./history.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, filePathImg, updatehistory } from "./history.utils";
import { CreateHistoryDto } from "./dto/create-history.dto";
import Logger from "../utils/Logger";

@Controller('history')
export class HistoryController {

  constructor(private readonly historyService: HistoryService) {}


  @Post('creat')
  async creatHistory(@Body() data: any) {
    try {
      return await this.historyService.creat(data)
    } catch (error) {
      console.log('ERROR: ', error)
      return error
    }
  }

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
        return await this.historyService.getDataHistory(name)
    }catch (error) {
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


  @Get('imag/:img')
  @Header('content-type','image/*')
  getImage(@Param('img') img: string, @Res({ passthrough: true }) response: any) {
    const file = this.historyService.getImageData(img);
    return new StreamableFile(file);
  }

  @Get('ping')
  async pingServer(@Request() req: any,) {
    const logger = new Logger()
    try {
      await logger.readLog(req.method,req.url,JSON.stringify(req.headers),'REQUEST', 'GetResources HistoryController')
      console.log(`GET REQUEST => PingServer HistoryController =>  /history/ping ${new Date()}: \n`)
      return { RSLT: true }
    }catch (error) {
      await logger.readLog(req.method,req.url,JSON.stringify(req.headers),'ERROR', 'GetResources HistoryController', JSON.stringify(error))
      console.log("PingServer HistoryController [ERROR]: ", error);
      return error
    }
  }

  @Get('resources')
  @Header('content-type','application/zip')
  async getResources(@Request() req: any){
    const logger = new Logger()
    try {
      await logger.readLog(req.method,req.url,JSON.stringify(req.headers),'REQUEST', 'GetResources HistoryController')

      const file = await this.historyService.getAllDataResources()

      console.log(`GET RESPONSE => GetResources HistoryController =>  /history/resources ${new Date()}: \n`, file)
      await logger.readLog(req.method,req.url,JSON.stringify(req.headers),'RESPONSE', 'GetResources HistoryController')

      return new StreamableFile(file);
    } catch (error) {
      await logger.readLog(req.method,req.url,JSON.stringify(req.headers),'ERROR', 'GetResources HistoryController', JSON.stringify(error))
      console.log("GetResources HistoryController [ERROR]: ", error);
      return error
    }

  }

  @Put('resources')
  @Header('content-type','application/zip')
  async updateDiffResource(@Body() json: object) {
    // console.log(`PUT REQUEST  /history/resources  ${new Date()}`)
    const file = await this.historyService.diffResource(json)
    // console.log(`PUT RESPONSE  /history/resources  ${new Date()}`, file)
    return new StreamableFile(file);
  }

  @Delete('resources/:name')
  async deleteHistory(@Param() params: CreateHistoryDto) {
    try {
      console.log('TEST DELETE ENDPOINT: ', params.name);
      return await this.historyService.deleteHistory(params.name)
      // return true
    } catch (error) {
      console.log('DeleteHistory HistoryController ERROR: ', error);
      return error
    }
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
