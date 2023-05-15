import { Test, TestingModule } from '@nestjs/testing';
import { TwelService } from './twel.service';

describe('TwelService', () => {
  let service: TwelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwelService],
    }).compile();

    service = module.get<TwelService>(TwelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
