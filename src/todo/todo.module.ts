import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '../user/guards/auth.guard';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService, AuthGuard],
})
export class TodoModule {}
