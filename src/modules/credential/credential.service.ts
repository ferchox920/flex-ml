import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialEntity } from './entities/credential.entity';
import * as dotenv from 'dotenv';
import { HttpService } from '@nestjs/axios';
import { EcommerceEntity } from '../ecommerces/entities/ecommerce.entity';

dotenv.config();

@Injectable()
export class CredentialService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(EcommerceEntity)
    private readonly ecommerceRepository: Repository<EcommerceEntity>,
    @InjectRepository(CredentialEntity)
    private readonly credentialRepository: Repository<CredentialEntity>,
  ) {}

  async newToken(ecommerce: EcommerceEntity): Promise<CredentialEntity> {
    try {
      // Validate ecommerce entity
      if (!ecommerce) {
        throw new NotFoundException('Ecommerce not found');
      }

      // Fetch token from MercadoLibre API
      const response = await this.requestNewTokens(ecommerce);

      // Check if the response is successful and contains valid data
      if (
        response.status !== 200 ||
        !response.data.access_token ||
        !response.data.refresh_token
      ) {
        throw new InternalServerErrorException(
          'Failed to retrieve valid access token',
        );
      }
      // Find existing credential for this ecommerce
      let existingCredential = await this.credentialRepository
        .createQueryBuilder('credential')
        .leftJoinAndSelect('credential.ecommerce', 'ecommerce')
        .where('ecommerce.id = :id', { id: ecommerce.id })
        .getOne();

      // Update or create credential based on existence
      if (existingCredential) {
        existingCredential.accessToken = response.data.access_token;
        existingCredential.refreshToken = response.data.refresh_token;
        await this.credentialRepository.save(existingCredential);
      } else {
        const newCredential = this.credentialRepository.create({
          ecommerce,
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        });
        existingCredential =
          await this.credentialRepository.save(newCredential);
      }

      return existingCredential;
    } catch (error) {
      // Handle specific MercadoLibre errors (consider adding more cases)
      if (error.response && error.response.status === 400) {
        throw new BadRequestException('Invalid or expired tokens');
      } else {
        // Log other errors and throw a generic error with details in logs
        console.error('Error fetching token:', error);
        throw new InternalServerErrorException(
          'Error creating or updating credential',
        );
      }
    }
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
      if (error.response && error.response.status === 400) {
        console.error('Invalid or expired tokens:', error.response.data);
        throw new BadRequestException('Invalid or expired tokens');
      } else {
        // For other errors, rethrow the original error
        throw error;
      }
    }
  }

  private async handleError(message: string, error: any): Promise<void> {
    console.error(message, error.message);
    if (error.response) {
      console.error('Respuesta de la API:', error.response.data);
    }
    throw error;
  }

  async getCrendentials(
    ecommerce: EcommerceEntity,
  ): Promise<CredentialEntity | null> {
    const storedCredential = await this.credentialRepository.findOne({
      where: { ecommerce },
    });
    return storedCredential || null;
  }

  async refreshTokens(ecommerce: EcommerceEntity): Promise<CredentialEntity> {
    try {
      if (!ecommerce) {
        throw new NotFoundException('Ecommerce not found');
      }

      let existingCredential = await this.credentialRepository
        .createQueryBuilder('credential')
        .leftJoinAndSelect('credential.ecommerce', 'ecommerce')
        .where('ecommerce.id = :id', { id: ecommerce.id })
        .getOne();

      // Solicitar un nuevo token utilizando el token de actualización de la credencial existente
      const response = await this.httpService
        .post('https://api.mercadolibre.com/oauth/token', {
          grant_type: 'refresh_token',
          client_id: ecommerce.appId,
          client_secret: ecommerce.clientSecret,
          refresh_token: existingCredential.refreshToken,
        })
        .toPromise();

      // Actualizar la credencial existente con los nuevos tokens
      existingCredential.accessToken = response.data.access_token;
      existingCredential.refreshToken = response.data.refresh_token;

      // Guardar la credencial actualizada en la base de datos
      existingCredential =
        await this.credentialRepository.save(existingCredential);
      return existingCredential;
    } catch (error) {
      // Manejar errores
      this.handleError('Error al refrescar los tokens:', error);
      throw error;
    }
  }
}
