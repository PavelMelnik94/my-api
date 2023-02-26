import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
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
import { User } from ".prisma/client";

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
    const foundUser = await this.userService.findOneById(+id);

    return foundUser ? foundUser : 'An account with this ID does not exist';
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser({
      id: +id,
      data: updateUserDto,
    });

    return updatedUser
      ? `Account with ID ${updatedUser.id} is updated`
      : 'An account with this ID does not exist';
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUserById(+id);

    return deletedUser
      ? `Account with ID ${deletedUser.id} is deleted`
      : 'An account with this ID does not exist';
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
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async updateRole(
    @Param('id') id: string,
    @Body('role') role: User['role'],
  ) {
    const updatedRoleUser = await this.userService.updateRole({
      id: +id,
      role
    });

    return updatedRoleUser
      ? `Account with ID ${updatedRoleUser.id} is updated`
      : 'An account with this ID does not exist';
  }
}
