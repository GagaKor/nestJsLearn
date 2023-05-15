import { Test, TestingModule } from '@nestjs/testing';
import { TwelController } from './twel.controller';

describe('TwelController', () => {
  let controller: TwelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwelController],
    }).compile();

    controller = module.get<TwelController>(TwelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
