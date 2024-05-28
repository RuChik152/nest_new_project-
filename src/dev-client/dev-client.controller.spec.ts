import { Test, TestingModule } from '@nestjs/testing';
import { DevClientController } from './dev-client.controller';
import { DevClientService } from './dev-client.service';

describe('DevClientController', () => {
  let controller: DevClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevClientController],
      providers: [DevClientService],
    }).compile();

    controller = module.get<DevClientController>(DevClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
