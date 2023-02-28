import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma.service';
import { Todo } from '@prisma/client';
import { Prisma } from '.prisma/client';
import { TInformationResponse } from '../contracts/informationResponse.interface';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createTodoDto: Prisma.TodoCreateInput,
  ): Promise<Todo | TInformationResponse> {
    return this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      select: {
        id: true,
        state: true,
        title: true,
        createdAt: true,
        description: true,
      },
    });
  }

  async findOne(id: number) {
    const foundTodo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return foundTodo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const foundTodo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: number): Promise<Todo & TInformationResponse> {
    const foundTodo = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!foundTodo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    const deletedTodo = await this.prisma.todo.delete({ where: { id } });
    return { ...deletedTodo, message: 'deleted' };
  }
}
