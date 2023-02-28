import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  IUserResponse,
  IUserResponseWithToken,
} from './types/userResponce.interface';
import { AuthGuard } from './guards/auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '.prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from './guards/role.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    const newUser = await this.userService.createUser(createUserDto);

    return newUser?.password
      ? { ...newUser, message: 'Account was successfully created' }
      : newUser;
  }

  @Get()
  async findAll() {
    return await this.userService.getAllUsers({});
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.userService.findOneById(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser({
      id: +id,
      data: updateUserDto,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async remove(@Param('id') id: string) {
    return await this.userService.deleteUserById(+id);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<IUserResponseWithToken> {
    const currentUser = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(currentUser);
  }

  @Patch(':id/update-role')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  @UsePipes(new ValidationPipe())
  async updateRole(@Param('id') id: string, @Body('role') role: User['role']) {
    await this.userService.updateRole({
      id: +id,
      role,
    });
  }
}
