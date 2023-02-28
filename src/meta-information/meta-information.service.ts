import { Injectable } from '@nestjs/common';
import { UpdateMetaInformationDto } from './dto/update-meta-information.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MetaInformationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMetaInfo() {
    return this.prisma.metaInformation.findFirst({
      where: {
        id: 1,
      },
    });
  }

  async updateMetaInfo(newData: UpdateMetaInformationDto) {
    return this.prisma.metaInformation.update({
      where: { id: 1 },
      data: newData,
    });
  }
}
