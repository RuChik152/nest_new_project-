import { Body, Controller, Get, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { response, Response } from "express";
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor
} from "@nestjs/platform-express";
import { diskStorage } from 'multer';

@ApiTags()
@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @Get('press_kit')
  streamable(@Res() response: Response) {
    const file = this.downloadService.imageBuffer();
    //console.log('file', file);
    // or
    // const file = this.downloadService.fileBuffer();
    //return new StreamableFile(file); // 👈 supports Buffer and Stream
    response.contentType('docx');
    response.attachment();
    response.send(file);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    console.log(file)
    return file
  }

  @Post('text')
  uploadText(@Body() data: any){
    console.log('DATA_TEXT', data)
    return data
  }

  @Post('files')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'file'},
    {name: 'text' }
  ]))
  uploadFiles(@UploadedFiles() dataFiles: Array<Express.Multer.File>){
    console.log(dataFiles)
    return dataFiles
  }

  @Post('history')
  @UseInterceptors(AnyFilesInterceptor({}))
  uploadHistory(@UploadedFiles() dataHistory: Array<Express.Multer.File>){
    console.log(dataHistory)
    return dataHistory
  }

}
