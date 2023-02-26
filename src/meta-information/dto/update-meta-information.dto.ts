import { PartialType } from '@nestjs/mapped-types';
import { CreateMetaInformationDto } from './create-meta-information.dto';

export class UpdateMetaInformationDto extends PartialType(
  CreateMetaInformationDto,
) {}
