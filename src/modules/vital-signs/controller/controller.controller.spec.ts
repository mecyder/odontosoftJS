import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignsController } from './controller.controller';

describe('ControllerController', () => {
  let controller: VitalSignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitalSignsController],
    }).compile();

    controller = module.get<VitalSignsController>(VitalSignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
