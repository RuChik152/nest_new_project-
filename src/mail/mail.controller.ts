import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MailService } from "./mail.service";
import { CreateMailDto } from "./dto/create-mail.dto";
import { UpdateMailDto } from "./dto/update-mail.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}


  @Post('report')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async bugReportSend (@Body() data: UpdateMailDto, @UploadedFile() file: Express.Multer.File, @Res() res: Response){
    const resSendEmail = await this.mailService.sendBugReport(data, file)

    res.status(resSendEmail.status).send(resSendEmail.data)

  }
 //  @Get()
 // async send(){
 //     return await this.mailService.sendMail()
 //  }
 //
 //  @Get('usr/:id')
 //  async getUserInfo(@Param('id') id: string) {
 //    console.log('getUserInfo: ', id)
 //    try {
 //      // return await this.mailService.getUser(id);
 //      return await this.mailService.deleteUser(id)
 //    } catch (error) {
 //      console.log(`[${new Date().toJSON()}] GetUserInfo MailController ERROR: `, error)
 //    }
 //  }
 //
 //
 //  @Post('usr')
 //  async firstRegUserPlatform(@Body() datauser: CreateMailDto){
 //    try {
 //      console.log('datauser: ', datauser)
 //      return await this.mailService.creatUserData(datauser)
 //    } catch (error) {
 //      console.log(`[${new Date().toJSON()}] FirstRegUserPlatform MailController ERROR: `, error)
 //    }
 //
 //  }
 //
 //
 //  /*
 //  * Эндпоинт для записи email,имени,платформы в базу данных
 //  */
 //  @Get('platform/:email/:name/:platform')
 //  async sendMailerSelectPlatform(@Param('email') email: string, @Param('name') name: string, @Param('platform') platform: string){
 //    try {
 //      console.log(`[${new Date().toJSON()}] SendMailerSelectPlatform MailController: `, [email, name, platform])
 //      return await this.mailService.sendUserSelectPlatform({email, name, platform})
 //      // return await this.mailService.sendMailUserSelectPlatform({email, name, platform})
 //    } catch (error) {
 //      console.log(`[${new Date().toJSON()}] SendMailerPico MailController ERROR: `, error)
 //      return error
 //    }
 //  }
 //
 //  @Get('rep/:email/:name/:platform')
 //  async sendRepeat(@Param() params: CreateMailDto){
 //      try {
 //          return await this.mailService.sendRepateEmail(params)
 //      } catch (error) {
 //        console.log(`[${new Date().toJSON()}] SendRepeat MailController ERROR: `, error)
 //        return error
 //      }
 //  }
 //
 //  @Get('newsletter')
 //  async newsletter(){
 //
 //  }


}
