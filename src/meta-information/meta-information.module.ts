import { Module } from '@nestjs/common';
import { MetaInformationService } from './meta-information.service';
import { MetaInformationController } from './meta-information.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MetaInformationController],
  providers: [MetaInformationService, PrismaService],
})
export class MetaInformationModule {}
