import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { User } from '.prisma/client';
import { TInformationResponse } from '../contracts/informationResponse.interface';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async createPost(
    createPostDto: Prisma.PostCreateInput,
    currentUser: User,
  ): Promise<Post> {
    try {
      const newPost: Prisma.PostCreateInput = {
        ...createPostDto,
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      };

      return this.prisma.post.create({ data: newPost });
    } catch (e) {
      throw new HttpException(`Something wrong! ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return await this.prisma.post.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (e) {
      throw new HttpException(`Something wrong! ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<Post | TInformationResponse> {
    try {
      const existPost = await this.prisma.post.findUnique({
        where: {
          id,
        },
      });

      return existPost ? existPost : { message: 'not found' };
    } catch (e) {
      throw new HttpException(`Something wrong! ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const foundPost = this.prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!foundPost) {
        throw new HttpException(
          `An post with id ${id} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.post.update({
        where: {
          id,
        },
        data: updatePostDto,
      });
    } catch (e) {
      throw new HttpException(`Something wrong! ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<TInformationResponse> {
    try {
      const foundPost = this.prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!foundPost) {
        throw new HttpException(
          `An post with id ${id} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const removedPost = await this.prisma.post.delete({ where: { id } });

      return !removedPost
        ? { message: 'Post successfully deleted' }
        : { error: 'Something wrong! Please try again' };
    } catch (e) {
      throw new HttpException(`Something wrong! ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
