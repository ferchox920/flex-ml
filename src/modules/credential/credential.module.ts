import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CredentialService } from './credential.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from './entities/credential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialEntity]),HttpModule,  ScheduleModule.forRoot(),],
  providers: [CredentialService],
  exports: [CredentialService], // Exporta el servicio si planeas usarlo en otros módulos
})
export class CredentialModule {}
