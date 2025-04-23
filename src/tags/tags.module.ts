import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/roles.guard';
@Module({
  imports: [AuthModule],
  controllers: [TagsController],
  providers: [TagsService, PrismaService, RolesGuard],
})
export class TagsModule {}
