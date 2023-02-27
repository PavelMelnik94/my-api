import { Injectable } from '@nestjs/common';
import { UpdateMetaInformationDto } from './dto/update-meta-information.dto';
import { PrismaService } from "../prisma.service";
import { MetaInformation } from "@prisma/client";

@Injectable()
export class MetaInformationService {
constructor(private readonly prisma: PrismaService) {
}

  async getAllMetaInfo() {
    return this.prisma.metaInformation.findMany({
      select: {
        metaTags: true,
        logo: false,
        title: true,
        description: true
      }
    });
  }


  async updateMetaInfo(id: number, updateMetaInformationDto: UpdateMetaInformationDto) {
    return `This action updates a #${id} metaInformation`;
  }


}
