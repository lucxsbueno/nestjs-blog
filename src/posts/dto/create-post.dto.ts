import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  thumbUrl?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsNumber()
  averageRating: number;

  @IsUUID()
  authorId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  categories?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  tags?: string[];
}
