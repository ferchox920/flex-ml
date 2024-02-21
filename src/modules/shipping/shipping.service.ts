// shipping.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { ShippingEntity } from './entities/shipping.entity';
import { CredentialService } from '../credential/credential.service';

@Injectable()
export class ShippingService implements OnModuleInit {
  constructor(
    @InjectRepository(ShippingEntity)
    private readonly shippingRepository: Repository<ShippingEntity>,
    private readonly credentialService: CredentialService,
  ) {}

  async onModuleInit() {
    await this.seedShippingOptions();
  }

  private async seedShippingOptions() {
    try {
      const accessToken = this.credentialService.getAccessToken();
      const response = await axios.get(
        'https://api.mercadolibre.com/sites/MLA/shipping_methods',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const shippingOptions = response.data;
  

      // Guardar cada objeto individualmente en la base de datos
      for (const option of shippingOptions) {
        await this.shippingRepository.save(option);
      }

      console.log('Shipping options seeded successfully.');
    } catch (error) {
      console.error('Error seeding shipping options:', error.message || error);
    }
  }
}
