import { Test, TestingModule } from '@nestjs/testing';
import { DetailProceduresPerformedController } from './controller';

describe('ControllerController', () => {
  let controller: DetailProceduresPerformedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailProceduresPerformedController],
    }).compile();

    controller = module.get<DetailProceduresPerformedController>(
      DetailProceduresPerformedController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
