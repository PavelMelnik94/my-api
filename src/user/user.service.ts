import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { User, Prisma } from '@prisma/client';
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IUserResponseWithToken } from "./types/userResponce.interface";


const configService = new ConfigService();
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {

    delete data.role
    const isAlreadyExist = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isAlreadyExist) {
      throw new HttpException('Account already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const createdUser = await this.prisma.user.create({ data });
    delete createdUser.password

    return createdUser
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
  ): Promise<User | null> {

    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!foundUser) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return foundUser ? foundUser : null
  }

  async updateUser(params: {
    id: Prisma.UserWhereUniqueInput['id'];
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { id, data } = params;
    const isExist = await this.prisma.user.findUnique({
      where: { id },
    });

    console.log(isExist, 'isExist');
    if (!isExist) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newBody = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === 'id') return null
      else return {...acc, [key]: value}
    },{})
    console.log(newBody, 'params');

    return this.prisma.user.update({
      where: { id },
      data: newBody,
    })
  }


  async updateRole(params: {
    id: Prisma.UserWhereUniqueInput['id'];
    role: User['role'];
  }): Promise<User> {
    const { id, role } = params;

    const existUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existUser) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const updatedUser = {
      ...existUser,
      role
    }

    console.log(updatedUser, 'updatedUser');

    return this.prisma.user.update({
      where: { id },
      data: updatedUser,
    })
  }

  async deleteUserById(id: Prisma.UserWhereUniqueInput['id']): Promise<User> {
    const isExist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new HttpException(
        `An account with id ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }


  async login(loginUserDto: LoginUserDto): Promise<User> {
    const inputUser = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email},
      select: {
        email: true,
        id: true,
        password: true,
        userName: true,
        role: true,
        posts: true
      }
    })

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
