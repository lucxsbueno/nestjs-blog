import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userPreference: true,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const { email, role, name, isAdmin, emailUpdates, password } =
      createUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        email,
        role,
        name,
        isAdmin,
        password: hashedPassword,
        userPreference: {
          create: {
            emailUpdates,
          },
        },
      },
      include: {
        userPreference: true,
      },
    });

    return plainToInstance(UserResponseDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(search: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;
    const nextPage = page + 1;
    const previousPage = page - 1;

    const users = await this.prisma.user.findMany({
      where: {
        OR: [{ name: { contains: search } }, { email: { contains: search } }],
      },
      skip,
      take,
    });

    const total = await this.prisma.user.count({
      where: {
        OR: [{ name: { contains: search } }, { email: { contains: search } }],
      },
    });

    return {
      data: users,
      meta: {
        total,
        page,
        nextPage,
        previousPage,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        writtenPosts: true,
        favoritePosts: true,
        postLikes: true,
        userPreference: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
