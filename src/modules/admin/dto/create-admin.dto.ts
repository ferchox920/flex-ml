import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ required: false, description: 'The name of the admin.', maxLength: 50 })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name?: string;

  @ApiProperty({ required: false, description: 'The lastname of the admin.', maxLength: 50 })
  @IsOptional()
  @IsString({ message: 'Lastname must be a string' })
  @MaxLength(50, { message: 'Lastname cannot exceed 50 characters' })
  lastname?: string;

  @ApiProperty({ required: true, description: 'The email of the admin.', maxLength: 100 })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  email: string;

  @ApiProperty({ required: false, description: 'The password of the admin.', maxLength: 100 })
  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
  password?: string;

  @ApiProperty({ required: false, description: 'The key of the admin.', maxLength: 50 })
  @IsOptional()
  @IsString({ message: 'Key must be a string' })
  @MaxLength(50, { message: 'Key cannot exceed 50 characters' })
  key?: string;
}
