import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialEntity } from './entities/credential.entity';
import * as dotenv from 'dotenv';
import { HttpService } from '@nestjs/axios';

dotenv.config();

@Injectable()
export class CredentialService {
  private accessToken: string;
  private refreshToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectRepository(CredentialEntity)
    private readonly credentialRepository: Repository<CredentialEntity>,
  ) {
    // // Agrega el código para obtener las credenciales al iniciar el servidor
    // this.initTokens();

    // // Configura el cron job para refrescar las credenciales cada 5 horas
    // const job = new CronJob('0 0 */5 * * *', async () => {
    //   await this.refreshTokens(this.refreshToken);
    // });

    // // Registra el cron job en el sistema de cron de NestJS
    // this.schedulerRegistry.addCronJob('refreshTokens', job);
    // job.start();
  }

  private async initTokens() {
    try {
      // Intenta cargar las credenciales desde la base de datos

      const storedCredential = await this.getCrendentials();

      if (storedCredential && storedCredential.refreshToken) {
        // Si hay un refreshToken, intenta refrescar los tokens
        await this.refreshTokens(storedCredential.refreshToken);
      } else {
        // Si no hay refreshToken o no se puede refrescar, obtén nuevas credenciales y guárdalas en la base de datos
        const response = await this.requestNewTokens();

        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;

        // Guarda las credenciales en la base de datos
        const newCredential = this.credentialRepository.create({
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        });
        await this.credentialRepository.save(newCredential);
      }
    } catch (error) {
      this.handleError('Error al obtener o guardar las credenciales:', error);
    }
  }

  private async requestNewTokens(): Promise<AxiosResponse<any>> {
    try {
      return await this.httpService
        .post('https://api.mercadolibre.com/oauth/token', {
          grant_type: 'authorization_code',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: process.env.CODE,
          redirect_uri: process.env.REDIRECT_URI,
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
    const storedCredential = storedCredentials.length > 0 ? storedCredentials[0] : null;
  
    if (storedCredential) {
      return storedCredential.accessToken;
    } else {
      return null;
    }
  }
  

  async getRefreshToken(): Promise<string | null> {
    const storedCredentials = await this.credentialRepository.find();
    const storedCredential =
      storedCredentials.length > 0 ? storedCredentials[0] : null;

    return storedCredential ? storedCredential.refreshToken : null;
  }

  async refreshTokens(refreshToken: string): Promise<AxiosResponse<any>> {
    try {
      console.log('aqui en refrescar token');
      const response = await this.httpService.post(
        'https://api.mercadolibre.com/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
        }
      ).toPromise();
  
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
  
      // Actualiza directamente en la base de datos sin buscar previamente
      await this.credentialRepository.update({}, {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
      });
  
      return response;
    } catch (error) {
      this.handleError('Error al refrescar los tokens:', error);
      throw error;
    }
  }
  
}
