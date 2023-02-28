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
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { RoleGuard } from '../user/guards/role.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async create(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return await this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async remove(@Param('id') id: string) {
    return await this.todoService.remove(+id);
  }
}
