import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    const { postId, ...data } = createCommentDto;
    return this.prisma.comment.create({
      data: {
        ...data,
        post: {
          connect: { id: postId },
        },
      },
    });
  }

  async findAll(search: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const take = limit;
    const nextPage = page + 1;
    const previousPage = page - 1;

    const comments = await this.prisma.comment.findMany({
      where: {
        comment: {
          contains: search,
        },
      },
      skip,
      take,
      include: {
        post: true,
      },
    });

    const total = await this.prisma.comment.count({
      where: {
        comment: {
          contains: search,
        },
      },
    });

    return {
      data: comments,
      meta: {
        total,
        page,
        nextPage,
        previousPage,
      },
    };
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        post: true,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
