import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  readonly title: Post['title'];

  @ApiProperty()
  readonly content: Post['content'];

  @ApiProperty()
  published: boolean;
}
