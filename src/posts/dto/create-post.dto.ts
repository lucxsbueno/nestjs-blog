import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'The title of the post' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The slug of the post',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiProperty({ description: 'The description of the post', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The content of the post' })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The thumbnail URL of the post',
    required: false,
  })
  @IsString()
  @IsOptional()
  thumbUrl?: string;

  @ApiProperty({ description: 'The URL of the post', required: false })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({
    description: 'Whether the post is published',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({ description: 'The average rating of the post' })
  @IsNumber()
  averageRating: number;

  @ApiProperty({ description: 'The ID of the post author' })
  @IsUUID()
  authorId: string;

  @ApiProperty({
    description: 'The likes of the post',
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  likes?: number;

  @ApiProperty({
    description: 'The tags of the post',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tags?: string[];
}
