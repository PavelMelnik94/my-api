import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '.prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  readonly userName?: User['userName'];

  @ApiProperty()
  readonly email?: User['email'];

  @ApiProperty()
  readonly password?: User['password'];
}
