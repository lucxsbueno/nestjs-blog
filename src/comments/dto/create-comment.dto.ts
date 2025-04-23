import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  anonymous?: boolean;

  @IsUUID()
  postId: string;

  @IsUUID()
  @IsOptional()
  userId?: string;
}
