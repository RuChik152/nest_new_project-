import { Body, Controller, Get, Header, Param, Post, Res, UploadedFile, UseInterceptors, StreamableFile } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, filePathImg } from "./history.utils";
import * as process from "process";


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

  @Get('imag/:img')
  @Header('content-type', 'image/jpeg')
  async getImage(@Param('img') img: string, @Res() res){
    const dirName = img.replace(/\..*$/ig, '');
    return  res.sendFile(img, {root:`${process.env.PATH_STORAGE_HISTORYS}/${dirName}`})
  }

  //TODO
  // @Get('imag/:img')
  // async getImage(@Param('img') img: string, @Res() res){
  //   const file = await this.historyService.getImageData(img)
  //   return new StreamableFile(file)
  // }


  @Get('resources')
  async getResources(){
    return await this.historyService.getAllDataResources()
  }


}
