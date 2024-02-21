import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { CredentialModule } from './modules/credential/credential.module';
import { ProductModule } from './modules/product/product.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { ShippingService } from './modules/shipping/shipping.service'; // Importa el servicio
import { ShippingEntity } from './modules/shipping/entities/shipping.entity';
 // Importa la entidad

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CredentialModule, ProductModule, ShippingModule, TypeOrmModule.forFeature([ShippingEntity])], // Agrega TypeOrmModule.forFeature para incluir la entidad
  controllers: [AppController],
  providers: [AppService, ShippingService], // Agrega ShippingService a la lista de providers
})
export class AppModule {}
