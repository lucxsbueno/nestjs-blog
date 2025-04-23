import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, RolesGuard],
})
export class CommentsModule {}
