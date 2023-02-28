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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { UserInfo } from '../user/decorators/user.decorator';
import { User } from '.prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../user/guards/role.guard';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UserInfo() currentUser: User,
  ) {
    return await this.postService.createPost(createPostDto, currentUser);
  }

  @Get()
  async findAll() {
    return await this.postService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UseGuards(new RoleGuard(['ADMIN', 'SUPERADMIN']))
  async remove(@Param('id') id: string) {
    return await this.postService.remove(+id);
  }
}
