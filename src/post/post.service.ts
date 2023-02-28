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
    const newPost: Prisma.PostCreateInput = {
      ...createPostDto,
      author: {
        connect: {
          id: currentUser.id,
        },
      },
    };

    return this.prisma.post.create({ data: newPost });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<Post | TInformationResponse> {
    const existPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!existPost) {
      return new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return existPost;
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const foundPost = this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!foundPost) {
      throw new HttpException(
        `An post with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  async remove(id: number): Promise<TInformationResponse> {
    const foundPost = this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!foundPost) {
      throw new HttpException(
        `An post with id ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    const removedPost = await this.prisma.post.delete({ where: { id } });

    return !removedPost
      ? { message: 'Post successfully deleted' }
      : { error: 'Something wrong! Please try again' };
  }
}
