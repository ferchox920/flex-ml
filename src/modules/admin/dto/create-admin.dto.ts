import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'Name cannot exceed 50 characters' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Lastname must be a string' })
  @MaxLength(50, { message: 'Lastname cannot exceed 50 characters' })
  lastname?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(100, { message: 'Email cannot exceed 100 characters' })
  email: string;


  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  @MaxLength(100, { message: 'Password cannot exceed 100 characters' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Key must be a string' })
  @MaxLength(50, { message: 'Key cannot exceed 50 characters' })
  key?: string;
}
