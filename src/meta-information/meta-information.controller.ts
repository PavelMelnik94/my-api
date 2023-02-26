import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MetaInformationService } from './meta-information.service';
import { CreateMetaInformationDto } from './dto/create-meta-information.dto';
import { UpdateMetaInformationDto } from './dto/update-meta-information.dto';

@Controller('meta-information')
export class MetaInformationController {
  constructor(
    private readonly metaInformationService: MetaInformationService,
  ) {}

  @Post()
  create(@Body() createMetaInformationDto: CreateMetaInformationDto) {
    return this.metaInformationService.create(createMetaInformationDto);
  }

  @Get()
  findAll() {
    return this.metaInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metaInformationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMetaInformationDto: UpdateMetaInformationDto,
  ) {
    return this.metaInformationService.update(+id, updateMetaInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metaInformationService.remove(+id);
  }
}
