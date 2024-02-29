import { Module } from '@nestjs/common';
import { EcommercesService } from './ecommerces.service';
import { EcommerceEntity } from './entities/ecommerce.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcommercesController } from './ecommerces.controller';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EcommerceEntity, UserEntity]), ],
  controllers: [EcommercesController],
  providers: [EcommercesService],
})
export class EcommercesModule {}
