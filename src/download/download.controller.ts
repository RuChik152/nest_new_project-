import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { Response } from 'express';

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
}
