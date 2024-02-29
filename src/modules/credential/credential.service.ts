import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { CronJob } from 'cron';
// import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialEntity } from './entities/credential.entity';
import * as dotenv from 'dotenv';
import { HttpService } from '@nestjs/axios';
import { EcommerceEntity } from '../ecommerces/entities/ecommerce.entity';

dotenv.config();

@Injectable()
export class CredentialService {
  private accessToken: string;
  private refreshToken: string;

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(EcommerceEntity)
    private readonly ecommerceRepository: Repository<EcommerceEntity>,
    @InjectRepository(CredentialEntity)
    private readonly credentialRepository: Repository<CredentialEntity>,
  ) {
    // Comenté esta parte porque inicializar los tokens directamente podría no ser necesario en el constructor
    // this.initTokens();
    // Comenté la configuración del cron job ya que no estaba siendo utilizado en el código proporcionado
    // const job = new CronJob('0 0 */5 * * *', async () => {
    //   await this.refreshTokens(this.refreshToken);
    // });
    // this.schedulerRegistry.addCronJob('refreshTokens', job);
    // job.start();
  }

  async createToken(ecommerce: EcommerceEntity) {
    if (!ecommerce) {
      throw new NotFoundException('Ecommerce not found');
    }
  
    console.log('asdasdasd');
    console.log(ecommerce);
  
    const existingCredential = await this.credentialRepository
    .createQueryBuilder('credential')
    .leftJoinAndSelect('credential.ecommerce', 'ecommerce')
    .where('ecommerce.id = :id', { id: ecommerce.id })
    .getOne();

  
 
  
    const response = await this.requestNewTokens(ecommerce);
  
    if (existingCredential) {
      await this.credentialRepository.update(existingCredential.id, {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });
      return existingCredential;
    }

    // Create a new credential if none exists
    const newCredential = this.credentialRepository.create({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      ecommerce: ecommerce,
    });

    console.log(newCredential);

    await this.credentialRepository.save(newCredential);

    return newCredential;
  }

  private async requestNewTokens(
    ecommerce: EcommerceEntity,
  ): Promise<AxiosResponse<any>> {
    try {
      return await this.httpService
        .post('https://api.mercadolibre.com/oauth/token', {
          grant_type: 'authorization_code',
          client_id: ecommerce.appId,
          client_secret: ecommerce.clientSecret,
          code: ecommerce.code,
          redirect_uri: ecommerce.redirectUri,
        })
        .toPromise();
    } catch (error) {
      this.handleError('Error al solicitar nuevas credenciales:', error);
    }
  }

  private async handleError(message: string, error: any): Promise<void> {
    console.error(message, error.message);
    if (error.response) {
      console.error('Respuesta de la API:', error.response.data);
    }
    throw error;
  }

  async getCrendentials(): Promise<CredentialEntity | null> {
    const storedCredentials = await this.credentialRepository.find();
    const storedCredential =
      storedCredentials.length > 0 ? storedCredentials[0] : null;

    return storedCredential;
  }

  async getAccessToken(): Promise<string | null> {
    const storedCredentials = await this.credentialRepository.find();
    const storedCredential =
      storedCredentials.length > 0 ? storedCredentials[0] : null;

    return storedCredential ? storedCredential.accessToken : null;
  }

  async getRefreshToken(): Promise<string | null> {
    const storedCredentials = await this.credentialRepository.find();
    const storedCredential =
      storedCredentials.length > 0 ? storedCredentials[0] : null;

    return storedCredential ? storedCredential.refreshToken : null;
  }

  async refreshTokens(refreshToken: string): Promise<AxiosResponse<any>> {
    try {
      const response = await this.httpService
        .post('https://api.mercadolibre.com/oauth/token', {
          grant_type: 'refresh_token',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
        })
        .toPromise();

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

      await this.credentialRepository.update(
        {},
        {
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        },
      );

      return response;
    } catch (error) {
      this.handleError('Error al refrescar los tokens:', error);
      throw error;
    }
  }
}
