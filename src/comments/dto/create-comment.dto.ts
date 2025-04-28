import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Whether the comment is anonymous',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  anonymous?: boolean;

  @ApiProperty({ description: 'The ID of the post this comment belongs to' })
  @IsUUID()
  postId: string;
}
