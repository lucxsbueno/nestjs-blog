import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [PostsController],
  providers: [PostsService, PrismaService, RolesGuard],
})
export class PostsModule {}
