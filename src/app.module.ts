import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { CredentialModule } from './modules/credential/credential.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { ShippingService } from './modules/shipping/shipping.service';
import { ShippingEntity } from './modules/shipping/entities/shipping.entity';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './modules/users/users.module';
import { EcommercesModule } from './modules/ecommerces/ecommerces.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AdminModule } from './modules/admin/admin.module';
import { ProfileModule } from './modules/profile/profile.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Importa y registra ScheduleModule
    TypeOrmModule.forRoot(dataSourceOptions),
    CredentialModule,
    HttpModule,
    ShippingModule,
    TypeOrmModule.forFeature([ShippingEntity]),
    UsersModule,
    EcommercesModule,
    AuthModule,
    OrdersModule,
    AdminModule,
    ProfileModule,
    JobsModule,
    
  ],
  providers: [AppService, ShippingService],
})
export class AppModule {}
