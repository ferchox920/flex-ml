import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEcommerceDto {
  @ApiProperty({ description: 'Name of the ecommerce', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({ description: 'App ID of the ecommerce', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  appId: string;

  @ApiProperty({ description: 'Client Secret of the ecommerce', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  clientSecret: string;

  @ApiProperty({ description: 'Redirect URI of the ecommerce', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  redirectUri: string;
}
