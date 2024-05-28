import { Test, TestingModule } from '@nestjs/testing';
import { AnaliticController } from './analitic.controller';
import { AnaliticService } from './analitic.service';

describe('AnaliticController', () => {
  let controller: AnaliticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnaliticController],
      providers: [AnaliticService],
    }).compile();

    controller = module.get<AnaliticController>(AnaliticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
