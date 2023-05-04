import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
 async send(){
     return await this.mailService.sendMail()
    // this.mailService.example()
    // return true
  }

  @Get('test')
  async sendTest(){
    return await this.mailService.sendUserConfirmation()
    // this.mailService.example()
    // return true
  }

}
