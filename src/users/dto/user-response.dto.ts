import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  @ApiProperty({ enum: Role })
  role: Role;

  @Expose()
  @ApiProperty()
  isAdmin: boolean;

  @Expose()
  @ApiProperty()
  userPreference?: {
    emailUpdates: boolean;
  };
}
