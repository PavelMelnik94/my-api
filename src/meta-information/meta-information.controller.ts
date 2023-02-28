import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MetaInformationService } from './meta-information.service';
import { UpdateMetaInformationDto } from './dto/update-meta-information.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('meta-information')
@Controller('meta-information')
export class MetaInformationController {
  constructor(
    private readonly metaInformationService: MetaInformationService,
  ) {}

  @Get()
  async getAllMetaInfo() {
    return await this.metaInformationService.getAllMetaInfo();
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async updateMetaInfo(@Body() newBody: UpdateMetaInformationDto) {
    return await this.metaInformationService.updateMetaInfo(newBody);
  }
}
