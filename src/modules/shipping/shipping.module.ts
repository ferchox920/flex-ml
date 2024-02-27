import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { ShippingEntity } from './entities/shipping.entity';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { HttpModule } from '@nestjs/axios';
import { CredentialModule } from '../credential/credential.module';


@Module({
  imports: [TypeOrmModule.forFeature([ShippingEntity,]), HttpModule,CredentialModule],
  providers: [ShippingService],
  controllers: [ShippingController],
  exports: [ShippingService],
})
export class ShippingModule {}
