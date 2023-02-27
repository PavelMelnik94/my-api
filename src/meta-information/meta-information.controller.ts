import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
   UsePipes, ValidationPipe, UseGuards
} from "@nestjs/common";
import { MetaInformationService } from './meta-information.service';
import { UpdateMetaInformationDto } from './dto/update-meta-information.dto';
import { AuthGuard } from "../user/guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('meta-information')
@Controller('meta-information')
export class MetaInformationController {
  constructor(
    private readonly metaInformationService: MetaInformationService,
  ) {}

  @Get()
  async getAllMetaInfo() {
    return this.metaInformationService.getAllMetaInfo();
  }


  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  updateMetaInfo(
    @Param('id') id: string,
    @Body() updateMetaInformationDto: UpdateMetaInformationDto,
  ) {
    return this.metaInformationService.updateMetaInfo(+id, updateMetaInformationDto);
  }
}
