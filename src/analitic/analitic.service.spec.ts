import { Test, TestingModule } from '@nestjs/testing';
import { AnaliticService } from './analitic.service';

describe('AnaliticService', () => {
  let service: AnaliticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnaliticService],
    }).compile();

    service = module.get<AnaliticService>(AnaliticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
