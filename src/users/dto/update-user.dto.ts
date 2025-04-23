import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The name of the user',
    required: false,
    minLength: 2,
    maxLength: 50,
  })
  name?: string;

  @ApiProperty({ description: 'The email of the user', required: false })
  email?: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    required: false,
  })
  role?: Role;

  @ApiProperty({ description: 'Whether the user is an admin', required: false })
  isAdmin?: boolean;

  @ApiProperty({
    description: 'Whether the user wants to receive email updates',
    required: false,
  })
  emailUpdates?: boolean;
}
