import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  /*
   * Создание достижения
   */
  @Post()
  createAchievement(@Body() data: CreateAchievementDto) {
      return this.achievementService.createAchievement(data)
  }

}
