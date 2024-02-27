// shipping.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShippingEntity } from './entities/shipping.entity';
import { CredentialService } from '../credential/credential.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ShippingService implements OnModuleInit {
  constructor(
    @InjectRepository(ShippingEntity)
    private readonly shippingRepository: Repository<ShippingEntity>,
    private readonly httpService: HttpService,
    private readonly credentialService: CredentialService,
  ) {}

  async onModuleInit() {
    await this.seedShippingOptions();
  }

  private async seedShippingOptions() {
    try {
      const validator = await this.shippingRepository.find();
      if (validator && validator.length > 0) {
        return;
      }
  
      const accessToken = await this.credentialService.getAccessToken();
      const response = await this.httpService.get(
        'https://api.mercadolibre.com/sites/MLA/shipping_methods',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ).toPromise();
  
      const shippingOptions = response.data;
  
      // Guardar cada objeto individualmente en la base de datos
      for (const option of shippingOptions) {
        const {
          id,
          name,
          type,
          deliver_to: deliverTo,
          status,
          site_id: siteId,
          free_options: freeOptions,
          shipping_modes: shippingModes,
          company_id: companyId,
          company_name: companyName,
          min_time: minTime,
          max_time: maxTime,
          currency_id: currencyId,
        } = option;
  
        const create = this.shippingRepository.create({
          id,
          name,
          type,
          deliverTo,
          status,
          siteId,
          freeOptions,
          shippingModes,
          companyId,
          companyName,
          minTime,
          maxTime,
          currencyId,
        });
  
        await this.shippingRepository.save(create);
      }
  
      console.log('Shipping options seeded successfully.');
    } catch (error) {
      console.error('Error seeding shipping options:', error.message || error);
    }
  }
  
  async getAllShipping() {
    return await this.shippingRepository.find();
  }

  async getShippingByApi() {
    try {
      const accessToken = await this.credentialService.getAccessToken();

      const response = await this.httpService.get(
        'https://api.mercadolibre.com/sites/MLA/shipping_methods',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ).toPromise();

      const data = response.data;
      console.log(data);
      
    } catch (error) {
      console.error('Error fetching shipping options from API:', error.message || error);
      throw error;
    }
  }
}
