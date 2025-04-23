import { Role } from '../enums/role.enum';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    required: false,
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ description: 'Whether the user is an admin' })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    description: 'Whether the user wants to receive email updates',
  })
  @IsBoolean()
  emailUpdates: boolean;
}
