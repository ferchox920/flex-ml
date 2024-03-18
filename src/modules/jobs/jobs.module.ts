import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CredentialModule } from '../credential/credential.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from '../credential/entities/credential.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CredentialEntity]),CredentialModule,],
  providers: [JobsService],
})
export class JobsModule {}
