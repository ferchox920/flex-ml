// shipping.service.ts
import { Injectable,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingEntity } from './entities/shipping.entity';
import { CredentialService } from '../credential/credential.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingEntity)
    private readonly shippingRepository: Repository<ShippingEntity>,
    private readonly httpService: HttpService,
    private readonly credentialService: CredentialService,
  ) {}




  // async getShippingByApi() {
  //   try {
  //     const accessToken = await this.credentialService.getAccessToken();

  //     const response = await this.httpService
  //       .get('https://api.mercadolibre.com/sites/MLA/shipping_methods', {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       .toPromise();

  //     const data = response.data;
  //     console.log(data);
  //   } catch (error) {
  //     console.error(
  //       'Error fetching shipping options from API:',
  //       error.message || error,
  //     );
  //     throw error;
  //   }
  // }
}
