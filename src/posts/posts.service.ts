import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateUniqueSlug(title: string): Promise<string> {
    const baseSlug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existingPost = await this.prisma.post.findUnique({
        where: { slug },
      });

      if (!existingPost) {
        break;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  async create(createPostDto: CreatePostDto) {
    const { categories, tags, content, ...data } = createPostDto;
    const slug = await this.generateUniqueSlug(data.title);

    return this.prisma.post.create({
      data: {
        ...data,
        slug,
        content: `${content}`,
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
        comments: true,
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
