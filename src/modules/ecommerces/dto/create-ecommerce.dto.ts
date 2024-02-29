import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEcommerceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  appId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  clientSecret: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  redirectUri: string;
}
