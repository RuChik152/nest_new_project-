import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Achievement } from "./entities/achievement.schema";
import { Model } from "mongoose";

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<Achievement>
  ) {}


  /*
   * Создание нового достижения, в ответ возвращаеться созданный объект
   */
  async createAchievement(dataAchieve: CreateAchievementDto) {
      return await this.achievementModel.create(dataAchieve)
  }

}
