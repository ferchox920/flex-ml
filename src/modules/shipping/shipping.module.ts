// shipping.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingEntity } from './entities/shipping.entity';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { CredentialModule } from '../credential/credential.module'; // Importa el módulo CredentialModule aquí
import { CredentialService } from '../credential/credential.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingEntity]), CredentialModule], // Usa TypeOrmModule.forFeature para las entidades
  controllers: [ShippingController],
  providers: [ShippingService], // Agrega CredentialService a providers
})
export class ShippingModule {}
