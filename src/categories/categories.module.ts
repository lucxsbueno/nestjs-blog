import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from '../auth/guards/roles.guard';
@Module({
  imports: [AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, RolesGuard],
})
export class CategoriesModule {}
