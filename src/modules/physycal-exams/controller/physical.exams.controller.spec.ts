import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalExamsController } from './physical.exams.controller';

describe('PhysicalExamsControllerController', () => {
  let controller: PhysicalExamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicalExamsController],
    }).compile();

    controller = module.get<PhysicalExamsController>(PhysicalExamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
