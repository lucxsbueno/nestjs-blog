import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ description: 'The content of the comment', required: false })
  content?: string;

  @ApiProperty({
    description: 'Whether the comment is anonymous',
    required: false,
  })
  anonymous?: boolean;

  @ApiProperty({
    description: 'The ID of the post this comment belongs to',
    required: false,
  })
  postId?: string;

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    required: false,
  })
  userId?: string;
}
