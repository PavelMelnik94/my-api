import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Todo } from '@prisma/client';

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: Todo['title'];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: Todo['description'];

  @ApiProperty()
  readonly state?: Todo['state'];
}
