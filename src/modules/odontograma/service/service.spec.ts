import { Test, TestingModule } from '@nestjs/testing';
import { OdontogramaService } from './service';

describe('ServiceService', () => {
  let service: OdontogramaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdontogramaService],
    }).compile();

    service = module.get<OdontogramaService>(OdontogramaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
