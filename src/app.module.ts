import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [TagsModule, CategoriesModule, UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
