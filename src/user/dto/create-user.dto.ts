import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { User } from ".prisma/client";

export class CreateUserDto {
  @ApiProperty()
  readonly userName?: User['userName']

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: User['email']

  @ApiProperty()
  @IsNotEmpty()
  readonly password: User['password'];
}