import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs';

@Controller('profile')
@ApiTags('Profile') // Etiqueta Swagger para el controlador
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('user-data')
  @ApiBody({ schema: { properties: { token: { type: 'string' } } } })
  getUserData(@Body('token') token: string) {
    return this.profileService.getUserData(token);
  }
}
