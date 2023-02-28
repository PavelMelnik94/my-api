import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MetaInformationModule } from './meta-information/meta-information.module';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { PrismaService } from './prisma.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UserModule, PostModule, MetaInformationModule, TodoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
