import { Test, TestingModule } from '@nestjs/testing';
import { AilmentsController } from './controller';

describe('Controller', () => {
  let controller: AilmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AilmentsController],
    }).compile();

    controller = module.get<AilmentsController>(AilmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
