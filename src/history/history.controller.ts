import { Body, Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, filePathImg } from "./history.utils";

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

}
