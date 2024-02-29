import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { CredentialModule } from './modules/credential/credential.module';
import { ProductModule } from './modules/product/product.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { ShippingService } from './modules/shipping/shipping.service';
import { ShippingEntity } from './modules/shipping/entities/shipping.entity';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './modules/users/users.module';
import { EcommercesModule } from './modules/ecommerces/ecommerces.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CredentialModule, ProductModule,HttpModule, ShippingModule, TypeOrmModule.forFeature([ShippingEntity]), UsersModule, EcommercesModule, AuthModule], 
  providers: [AppService, ShippingService], 
})
export class AppModule {}
