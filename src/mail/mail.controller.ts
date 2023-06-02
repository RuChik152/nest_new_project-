import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';


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
      console.log(`[${new Date().toJSON()}] FirstRegUserPlatform MailController ERROR: `, error)
    }

  }


  @Get('platform/:email/:name/:platform')
  async sendMailerSelectPlatform(@Param('email') email: string, @Param('name') name: string, @Param('platform') platform: string){
    try {
      console.log(`[${new Date().toJSON()}] SendMailerSelectPlatform MailController: `, [email, name, platform])
      return await this.mailService.sendUserSelectPlatform({email, name, platform})
      // return await this.mailService.sendMailUserSelectPlatform({email, name, platform})
    } catch (error) {
      console.log(`[${new Date().toJSON()}] SendMailerPico MailController ERROR: `, error)
      return error
    }
  }

  @Get('rep/:email/:name/:platform')
  async sendRepeat(@Param() params: CreateMailDto){
      try {
          return await this.mailService.sendRepateEmail(params)
      } catch (error) {
        console.log(`[${new Date().toJSON()}] SendRepeat MailController ERROR: `, error)
        return error
      }
  }

  @Get('newsletter')
  async newsletter(){

  }


}
