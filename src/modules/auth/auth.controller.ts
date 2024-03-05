import { Controller, Post, Req, HttpException, HttpStatus, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from '../users/dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Return user and authentication token.' })
  @ApiBadRequestResponse({ description: 'Invalid credentials.' })
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Req() req: Request & { user: JwtPayload }) {
    try {
      const result = await this.authService.login(req.user);
      return result;
    } catch (ex: any) {
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }
}
