import { Injectable } from '@nestjs/common';
import { CreateAnaliticDto } from './dto/create-analitic.dto';
import { UpdateAnaliticDto } from './dto/update-analitic.dto';
import { InjectModel } from "@nestjs/mongoose";
import {Analytic, AnalyticSchemaDocument} from './analitic.schema'
import { Model } from "mongoose";

@Injectable()
export class AnaliticService {

  constructor(
    @InjectModel(Analytic.name) private analitycModel: Model<AnalyticSchemaDocument>,
  ) {}


  async writeAnalitycDb(userData: any) {
    const data = {
      sessionId: userData.sessionId,
      email: userData.email,
      name: userData.name,
      dataEvent: [
        userData.eventData
      ],
      utm: [
        ...userData.utm
      ]
    }
    const check = await this.analitycModel.findOne({sessionId: userData.sessionId})
    if(check) {
      console.log('Надйен')
      const eventLIst = check.dataEvent;
      // @ts-ignore
      eventLIst.push(userData.eventData)
      const updateData = await this.analitycModel.findOneAndUpdate({sessionId: userData.sessionId}, {dataEvent:eventLIst})
      return updateData
    } else {
      console.log('Не найден')
      const writeData = await this.analitycModel.create(data)
      return writeData
    }
    // const writeData = await this.analitycModel.create(data)

  }

  // create(createAnaliticDto: CreateAnaliticDto) {
  //   return 'This action adds a new analitic';
  // }
  //
  // findAll() {
  //   return `This action returns all analitic`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} analitic`;
  // }
  //
  // update(id: number, updateAnaliticDto: UpdateAnaliticDto) {
  //   return `This action updates a #${id} analitic`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} analitic`;
  // }
}
