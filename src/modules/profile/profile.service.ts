import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly httpService: HttpService,
  ) {}

  async getUserData(token: string): Promise<any> {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const result = await this.httpService
        .get('https://api.mercadolibre.com/users/me', { headers })
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error('Error in MercadoLibre API request:', error);
            throw new HttpException('Unable to fetch user data', HttpStatus.INTERNAL_SERVER_ERROR);
          }),
        )
        .toPromise();

      console.log('User data from MercadoLibre:', result);
      return result;
    } catch (error) {
      console.error('Error in getUserData:', error);
      throw new HttpException('Unable to fetch user data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
