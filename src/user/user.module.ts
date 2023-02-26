import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthGuard],
})
export class UserModule {}
