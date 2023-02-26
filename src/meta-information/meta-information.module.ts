import { Module } from '@nestjs/common';
import { MetaInformationService } from './meta-information.service';
import { MetaInformationController } from './meta-information.controller';

@Module({
  controllers: [MetaInformationController],
  providers: [MetaInformationService],
})
export class MetaInformationModule {}
