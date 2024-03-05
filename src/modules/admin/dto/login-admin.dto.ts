import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    description: 'The email of the admin.',
    example: 'admin@example.com',
  })
  @IsNotEmpty({ message: 'Email can not be null' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'The password of the admin.',
    example: 'securepassword123',
  })
  @IsNotEmpty({ message: 'Password can not be null' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'The key of the admin.',
    example: 'admin_key',
  })
  @IsString({ message: 'Key must be a string' })
  @IsNotEmpty({ message: 'Key cannot be empty' })
  type: string;
}
