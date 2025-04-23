import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ description: 'The name of the tag' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

class Post {
  title: string;
  description: string;
  content: string;
  thumbUrl: string;
  url: string;
  published: boolean;
  averageRating: number;
  createdAt: Date;
  upadatedAt: Date;
  author: User;
  authorId: string;
  favoritedBy: User;
  favouriteId: string;
  categories: Category[];
  tags: Tag[];
  comments: Comment[];
  postLikes: PostLike[];
}

class User {
  name: string;
  email: string;
  writtenPosts: Post[];
  favoritePosts: Post[];
  userPreference: UserPreference;
  role: Role;
  isAdmin: boolean;
  postLikes: PostLike[];
}

class UserPreference {
  emailUpdates: boolean;
  user: User;
  userId: string;
}

enum Role {
  GUEST,
  ADMIN,
  EDITOR,
}

class Category {
  id: string;
  name: string;
  posts: Post[];
}

class Tag {
  id: string;
  name: string;
  posts: Post[];
}

class PostLike {
  id: string;
  post: Post;
  postId: string;
}

class Comment {
  id: string;
  name: string;
  email: string;
  anonymous: boolean;
  content: string;
  post: Post;
  postId: string;
  createdAt: Date;
}
