import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '.prisma/client';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: User['email'];

  @ApiProperty()
  @IsNotEmpty()
  readonly password?: User['password'];
}
