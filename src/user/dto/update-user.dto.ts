import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { User } from ".prisma/client";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  readonly userName?: User['userName']

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email?: User['email']

  @ApiProperty()
  @IsNotEmpty()
  readonly password?: User['password'] ;
}
