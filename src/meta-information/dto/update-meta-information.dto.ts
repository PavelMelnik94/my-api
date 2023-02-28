import { MetaInformation } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMetaInformationDto {
  @ApiProperty()
  readonly title?: MetaInformation['title'];

  @ApiProperty()
  readonly description?: MetaInformation['description'];

  @ApiProperty()
  readonly logo?: MetaInformation['logo'];

  @ApiProperty()
  readonly metaTags?: MetaInformation['metaTags'];
}
