import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IUserResponseWithToken } from './types/userResponce.interface';
import { TInformationResponse } from '../contracts/informationResponse.interface';

const configService = new ConfigService();
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User | any> {
    const isAlreadyExist = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isAlreadyExist) {
      throw new HttpException('Account already exist', HttpStatus.CONFLICT);
    }

    return this.prisma.user.create({ data });
  }

  async getAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOneById(
    id: Prisma.UserWhereUniqueInput['id'],
  ): Promise<User | TInformationResponse> {
    // Find user by ID
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!foundUser) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundUser
      ? foundUser
      : { message: 'An account with this ID does not exist' };
  }

  async updateUser(params: {
    id: Prisma.UserWhereUniqueInput['id'];
    data: Prisma.UserUpdateInput;
  }): Promise<User | any> {
    const { id, data } = params;
    const isExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const newBody = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === 'id') return null;
      else return { ...acc, [key]: value };
    }, {});

    return this.prisma.user.update({
      where: { id },
      data: newBody,
    });
  }

  async updateRole(params: {
    id: Prisma.UserWhereUniqueInput['id'];
    role: User['role'];
  }): Promise<User | any> {
    const { id, role } = params;

    const existUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existUser) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUser = {
      ...existUser,
      role,
    };

    return this.prisma.user.update({
      where: { id },
      data: updatedUser,
    });
  }

  async deleteUserById(
    id: Prisma.UserWhereUniqueInput['id'],
  ): Promise<User | TInformationResponse> {
    const isExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return !deletedUser
      ? { message: `Account with ID ${deletedUser.id} is deleted` }
      : { error: 'Something wrong' };
  }

  async login(loginUserDto: LoginUserDto): Promise<User | any> {
    const inputUser = await this.prisma.user.findFirst({
      where: { email: loginUserDto.email },
      select: {
        email: true,
        id: true,
        password: true,
        userName: true,
        role: true,
        posts: true,
      },
    });

    if (!inputUser) {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { password: inputPassword } = loginUserDto;
    const { password: existPassword } = inputUser;
    const isPasswordCorrect = await compare(inputPassword, existPassword);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete inputUser.password;

    return inputUser;
  }

  generateJWT(user: User): string {
    return sign(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
      } as User,
      configService.get('JWT_SECRET'),
    );
  }

  buildUserResponse(user: User): IUserResponseWithToken {
    return {
      ...user,
      token: this.generateJWT(user),
    };
  }
}
