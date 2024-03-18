import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEcommerceDto } from './dto/create-ecommerce.dto';
import { UpdateEcommerceDto } from './dto/update-ecommerce.dto';
import { UserEntity } from '../users/entities/user.entity';
import { EcommerceEntity } from './entities/ecommerce.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CredentialService } from '../credential/credential.service';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class EcommercesService {
  constructor(
    @InjectRepository(EcommerceEntity)
    private readonly ecommerceRepository: Repository<EcommerceEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly credentialService: CredentialService,
    private readonly httpService: HttpService,
  ) {}

  async createEcommerce(
    userId: string,
    createEcommerceDto: CreateEcommerceDto,
  ): Promise<EcommerceEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ecommerce = this.ecommerceRepository.create({
      ...createEcommerceDto,
      user,
    });

    return await this.ecommerceRepository.save(ecommerce);
  }

  async getUrlById(userId: string, id: string): Promise<string> {
    const ecommerce = await this.ecommerceRepository.findOne({
      where: {
        id,
      },
      relations: ['user'], 
    });
    
    if (!ecommerce || ecommerce.user.id !== userId) {
      throw new NotFoundException('Ecommerce not found for the user');
    }
   
    
    const url = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${ecommerce.appId}&redirect_uri=${ecommerce.redirectUri}`;
   
    return url;
   }
   

  async getCreate(params: { id: string; code: string }) {
    const ecommerce = await this.ecommerceRepository.findOne({
      where: { appId: params.id },
    });

    if (!ecommerce) {
      throw new NotFoundException('Ecommerce not found');
    }

    ecommerce.code = params.code;

    await this.ecommerceRepository.save(ecommerce);

    const credential = await this.credentialService.createToken(ecommerce);

    return credential;
  }

  async findOneById(id: string): Promise<EcommerceEntity> {
    const ecommerce = await this.ecommerceRepository.findOne({ where: { id } });
    if (!ecommerce) {
      throw new NotFoundException('Ecommerce not found');
    }

    return ecommerce;
  }

  findAllMyEcommerce(id: string): Promise<EcommerceEntity | undefined> {
    console.log(id);

    return this.ecommerceRepository.findOne({ where: { user: { id: id } } });
  }

  findOne(id: string): Promise<EcommerceEntity | undefined> {
    return this.ecommerceRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateEcommerceDto: UpdateEcommerceDto,
  ): Promise<EcommerceEntity> {
    const ecommerce = await this.findOneById(id);

    // // Actualizar propiedades según el DTO
    // ecommerce.name = updateEcommerceDto.name;
    // ecommerce.code = updateEcommerceDto.code;
    // // Agregar más propiedades según tu estructura

    return await this.ecommerceRepository.save(ecommerce);
  }

  async remove(id: string): Promise<void> {
    const ecommerce = await this.findOneById(id);
    await this.ecommerceRepository.remove(ecommerce);
  }
}
