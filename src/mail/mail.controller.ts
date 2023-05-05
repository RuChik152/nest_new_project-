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

  @Post('usr')
  async firstRegUserPlatform(@Body() datauser: CreateMailDto){
    try {
      return await this.mailService.creatUserData(datauser)
    } catch (error) {
      console.log('FirstRegUserPlatform MailController ERROR: ', error)
    }

  }


  @Get('platform/:email/:name/:platform')
  async sendMailerSelectPlatform(@Param('email') email: string, @Param('name') name: string, @Param('platform') platform: string){
    try {
      console.log('DATA: ', [email, name, platform])
      return await this.mailService.sendUserSelectPlatform({email, name, platform})
    } catch (error) {
      console.log('SendMailerPico MailController ERROR: ', error)
      return error
    }
  }

  @Get('rep/:email/:name/:platform')
  async sendRepeat(@Param() params: CreateMailDto){
      try {
          return await this.mailService.sendRepateEmail(params)
      } catch (error) {
        console.log('SendRepeat MailController ERROR: ', error)
        return error
      }
  }

}
