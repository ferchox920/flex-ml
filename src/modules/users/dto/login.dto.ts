import { IsNotEmpty, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: 'john@example.com' })
  @IsNotEmpty({ message: 'Email can not be null' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'strongPassword' })
  @IsNotEmpty({ message: 'Password can not be null' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'user' })
  @IsString({ message: 'Key must be a string' })
  @IsNotEmpty({ message: 'Key cannot be empty' })
  @IsEnum(['user', 'admin'], { message: 'Invalid user type' })
  type: string;
}
