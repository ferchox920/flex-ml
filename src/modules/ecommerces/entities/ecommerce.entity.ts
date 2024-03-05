import { CredentialEntity } from 'src/modules/credential/entities/credential.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'ecommerce' })
export class EcommerceEntity {
  @ApiProperty({ example: '1', description: 'The unique identifier of the ecommerce.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'My Ecommerce', description: 'The name of the ecommerce.', maxLength: 50 })
  @Column('character varying', { name: 'name', length: 50, nullable: true })
  name: string;

  @ApiProperty({ example: 'EC123', description: 'The code of the ecommerce.', maxLength: 50 })
  @Column('character varying', { name: 'code', length: 50, nullable: true })
  code: string;

  @ApiProperty({ example: 'app-id-123', description: 'The app ID of the ecommerce.', maxLength: 50 })
  @Column('character varying', { name: 'app_id', length: 50, nullable: true })
  appId: string;

  @ApiProperty({ example: 'client-secret-123', description: 'The client secret of the ecommerce.', maxLength: 50 })
  @Column('character varying', { name: 'client_secret', length: 50, nullable: true })
  clientSecret: string;

  @ApiProperty({ example: 'https://example.com/callback', description: 'The redirect URI of the ecommerce.', maxLength: 255 })
  @Column('character varying', { name: 'redirect_uri', length: 255, nullable: true })
  redirectUri: string;

  @ApiProperty({ type: () => UserEntity, description: 'The associated user entity.' })
  @ManyToOne(() => UserEntity, (user) => user.ecommerces)
  user: UserEntity;

  @ApiProperty({ type: () => CredentialEntity, description: 'The associated credential entity.' })
  @OneToOne(() => CredentialEntity, (credential) => credential.ecommerce)
  credential: CredentialEntity;

  @ApiProperty({ example: '2024-03-05T12:00:00Z', description: 'The creation timestamp of the ecommerce.' })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => `now()` })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-05T12:30:00Z', description: 'The last update timestamp of the ecommerce.' })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => `now()` })
  updatedAt: Date;

  constructor(partial: Partial<EcommerceEntity>) {
    Object.assign(this, partial);
  }
}
