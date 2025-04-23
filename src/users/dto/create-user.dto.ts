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

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsBoolean()
  isAdmin: boolean;
}
