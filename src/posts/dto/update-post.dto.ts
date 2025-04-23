import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: 'The title of the post', required: false })
  title?: string;

  @ApiProperty({ description: 'The description of the post', required: false })
  description?: string;

  @ApiProperty({ description: 'The content of the post', required: false })
  content?: string;

  @ApiProperty({
    description: 'The thumbnail URL of the post',
    required: false,
  })
  thumbUrl?: string;

  @ApiProperty({ description: 'The URL of the post', required: false })
  url?: string;

  @ApiProperty({
    description: 'Whether the post is published',
    required: false,
  })
  published?: boolean;

  @ApiProperty({
    description: 'The average rating of the post',
    required: false,
  })
  averageRating?: number;

  @ApiProperty({ description: 'The ID of the post author', required: false })
  authorId?: string;

  @ApiProperty({
    description: 'The categories of the post',
    required: false,
    type: [String],
  })
  categories?: string[];

  @ApiProperty({
    description: 'The tags of the post',
    required: false,
    type: [String],
  })
  tags?: string[];
}
