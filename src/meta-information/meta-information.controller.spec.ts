import { Test, TestingModule } from '@nestjs/testing';
import { MetaInformationController } from './meta-information.controller';
import { MetaInformationService } from './meta-information.service';

describe('MetaInformationController', () => {
  let controller: MetaInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaInformationController],
      providers: [MetaInformationService],
    }).compile();

    controller = module.get<MetaInformationController>(
      MetaInformationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
