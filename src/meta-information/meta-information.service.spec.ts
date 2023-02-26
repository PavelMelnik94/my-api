import { Test, TestingModule } from '@nestjs/testing';
import { MetaInformationService } from './meta-information.service';

describe('MetaInformationService', () => {
  let service: MetaInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaInformationService],
    }).compile();

    service = module.get<MetaInformationService>(MetaInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
