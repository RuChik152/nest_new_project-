import { Module } from '@nestjs/common';
import { AnaliticService } from './analitic.service';
import { AnaliticController } from './analitic.controller';
import { MongooseModule } from "@nestjs/mongoose";
import {Analytic, AnalyticSchema} from "./analitic.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Analytic.name, schema: AnalyticSchema}
    ])
  ],
  controllers: [AnaliticController],
  providers: [AnaliticService]
})
export class AnaliticModule {}
