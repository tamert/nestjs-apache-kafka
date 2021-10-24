import { Test, TestingModule } from '@nestjs/testing';
import { LokiResolver } from './loki.resolver';

describe('LokiResolver', () => {
  let resolver: LokiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LokiResolver],
    }).compile();

    resolver = module.get<LokiResolver>(LokiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
