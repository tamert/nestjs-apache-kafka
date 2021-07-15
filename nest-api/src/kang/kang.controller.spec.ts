import { Test, TestingModule } from '@nestjs/testing';
import { KangController } from './payment.controller';

describe('PaymentController', () => {
  let controller: KangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KangController],
    }).compile();

    controller = module.get<KangController>(KangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
