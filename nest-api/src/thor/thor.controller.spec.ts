import { Test, TestingModule } from '@nestjs/testing';
import { ThorController } from './thor.controller';

describe('ValidateController', () => {
  let controller: ThorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThorController],
    }).compile();

    controller = module.get<ThorController>(ThorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
