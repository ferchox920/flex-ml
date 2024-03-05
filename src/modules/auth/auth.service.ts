import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Roles } from 'src/utils/common/roles-enum';
import { JwtPayload } from './interface/jwt-payload.interface';
import { TokenTypes } from 'src/utils/common/token-types.enum';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async login(user: JwtPayload) {
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const credential = await this.authGenericResponse(user);
    return {
      user,
      credential,
    };
  }

  async authGenericResponse(user: JwtPayload | UserEntity) {
    return {
      access_token: this.generateToken(user, TokenTypes.ACCESS),
      refresh_token: this.generateToken(user, TokenTypes.REFRESH, {
        expiresIn: this.config.get('JWT_EXPIRATION_TIME_REFRESH'),
      }),
      expirationTime: this.calculateExpirationTime(),
      id: user?.id,
      email: user?.email,
      roles: Roles.USER,
    };
  }
  async getProfile(id: string) {
    const user = await this.usersService.findById(id);
    user.password;
    return user;
  }
  private calculateExpirationTime() {
    const expiresIn = this.config
      .get('JWT_EXPIRATION_TIME')
      .replace(/[^\d.-]/g, '');
    const timeNow = new Date();
    const expirationTokenTime = new Date(
      timeNow.getTime() + +(1000 * parseInt(expiresIn)),
    );
    return expirationTokenTime;
  }

  private generateToken(
    user: JwtPayload | UserEntity,
    type: TokenTypes,
    config?: {
      secret?: string;
      expiresIn?: string;
    },
  ) {
    const commonPayload: Object = {
      userType: Roles.USER,
      type: type,
      email: user.email,
      id: user.id,
      roles: Roles.USER,
    };
    const options: JwtSignOptions = {
      expiresIn: config?.expiresIn || this.config.get('JWT_EXPIRATION_TIME'),
      secret: config?.secret || this.config.get('JWT_SECRET'),
    };

    return this.jwtService.sign(commonPayload, options);
  }

  async validate(email: string, password: string, type: string): Promise<any> {
    let payload = { email, password, type };
    switch (type) {
      case Roles.USER:
        return await this.usersService.login(payload);
      case Roles.ADMIN:
        return await this.adminService.login(payload);
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async refreshToken(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return this.authGenericResponse(user);
  }
}
