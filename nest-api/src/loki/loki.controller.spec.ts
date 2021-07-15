import { Test, TestingModule } from '@nestjs/testing';
import { LokiController } from './loki.controller';

describe('CheckoutController', () => {
  let controller: LokiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LokiController],
    }).compile();

    controller = module.get<LokiController>(LokiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
