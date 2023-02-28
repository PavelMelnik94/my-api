import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Post } from '@prisma/client';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Title is too short',
  })
  @MaxLength(100, {
    message: 'Title is too long',
  })
  readonly title: Post['title'];

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(25, {
    message: 'Title is too short',
  })
  readonly content: Post['content'];

  @ApiProperty()
  published: boolean;
}
