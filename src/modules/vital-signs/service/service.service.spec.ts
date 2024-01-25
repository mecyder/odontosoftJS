import { Test, TestingModule } from '@nestjs/testing';
import { VitalSignsService } from './service.service';

describe('ServiceService', () => {
  let service: VitalSignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitalSignsService],
    }).compile();

    service = module.get<VitalSignsService>(VitalSignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
