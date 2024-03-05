import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { EcommerceEntity } from 'src/modules/ecommerces/entities/ecommerce.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('credentials')
export class CredentialEntity {
  @ApiProperty({ example: '1', description: 'The unique identifier of the credential.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'access-token', description: 'The access token of the credential.' })
  @Column()
  accessToken: string;

  @ApiProperty({ example: 'refresh-token', description: 'The refresh token of the credential.' })
  @Column()
  refreshToken: string;

  @ApiProperty({ type: () => EcommerceEntity, description: 'The associated ecommerce entity.' })
  @OneToOne(() => EcommerceEntity, (ecommerce) => ecommerce.credential)
  @JoinColumn({ name: 'ecommerce_id' })
  ecommerce: EcommerceEntity;

  @ApiProperty({ example: '2024-03-05T12:00:00Z', description: 'The creation timestamp of the credential.' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-05T12:30:00Z', description: 'The last update timestamp of the credential.' })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Exclude()
  @ApiProperty({ example: '2024-03-05T13:00:00Z', description: 'The deletion timestamp of the credential.' })
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  constructor(partial: Partial<CredentialEntity>) {
    Object.assign(this, partial);
  }
}
