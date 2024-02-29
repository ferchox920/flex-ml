import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,

} from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty({ message: 'Email can not be null' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be null' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString({ message: 'Key must be a string' })
  @IsNotEmpty({ message: 'Key cannot be empty' })
  type: string;
}
