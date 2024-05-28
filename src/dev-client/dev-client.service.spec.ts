import { Test, TestingModule } from '@nestjs/testing';
import { DevClientService } from './dev-client.service';

describe('DevClientService', () => {
  let service: DevClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevClientService],
    }).compile();

    service = module.get<DevClientService>(DevClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
