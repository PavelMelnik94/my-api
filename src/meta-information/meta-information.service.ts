import { Injectable } from '@nestjs/common';
import { CreateMetaInformationDto } from './dto/create-meta-information.dto';
import { UpdateMetaInformationDto } from './dto/update-meta-information.dto';

@Injectable()
export class MetaInformationService {
  create(createMetaInformationDto: CreateMetaInformationDto) {
    return 'This action adds a new metaInformation';
  }

  findAll() {
    return `This action returns all metaInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metaInformation`;
  }

  update(id: number, updateMetaInformationDto: UpdateMetaInformationDto) {
    return `This action updates a #${id} metaInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} metaInformation`;
  }
}
