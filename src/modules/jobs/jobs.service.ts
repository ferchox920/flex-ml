import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialEntity } from '../credential/entities/credential.entity';
import { CredentialService } from '../credential/credential.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(CredentialEntity)
    private readonly credentialRepository: Repository<CredentialEntity>,
    private readonly credentialService: CredentialService,
  ) {}

  @Cron(CronExpression.EVERY_3_HOURS)
  async handleTokenRefresh() {
    try {
      const credentials = await this.credentialRepository.find({
        relations: ['ecommerce'],
      });
      if (!credentials || credentials.length === 0) {
        console.log('No credentials found');
        return;
      }

      for (const credential of credentials) {
        await this.credentialService.refreshTokens(credential.ecommerce);
      }

      console.log('Token refresh job executed successfully');
    } catch (error) {
      console.error('Error executing token refresh job:', error);
    }
  }
}
