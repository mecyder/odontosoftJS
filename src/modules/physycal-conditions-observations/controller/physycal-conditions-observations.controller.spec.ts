import { Test, TestingModule } from '@nestjs/testing';
import { PhysycalConditionsObservationsController } from '../controller/physycal-conditions-observations.controller';

describe('PhysycalConditionsObservationsController', () => {
  let controller: PhysycalConditionsObservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysycalConditionsObservationsController],
    }).compile();

    controller = module.get<PhysycalConditionsObservationsController>(
      PhysycalConditionsObservationsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
