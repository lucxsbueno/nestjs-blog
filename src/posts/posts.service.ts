import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const { categories, tags, ...data } = createPostDto;
    return this.prisma.post.create({
      data: {
        ...data,
        categories: {
          connect: categories?.map((id) => ({ id })) || [],
        },
        tags: {
          connect: tags?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async findAll(search: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;
    const nextPage = page + 1;
    const previousPage = page - 1;

    const posts = await this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { content: { contains: search } },
        ],
      },
      skip,
      take,
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    });

    const total = await this.prisma.post.count({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { content: { contains: search } },
        ],
      },
    });

    return {
      data: posts,
      meta: {
        total,
        page,
        nextPage,
        previousPage,
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        categories: true,
        tags: true,
        postLikes: true,
        comments: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const { categories, tags, ...data } = updatePostDto;

    return this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        categories: categories
          ? {
              set: categories.map((id) => ({ id })),
            }
          : undefined,
        tags: tags
          ? {
              set: tags.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    });
  }

  async remove(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.delete({
      where: { id },
    });
  }
}
