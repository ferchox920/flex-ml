import { CredentialEntity } from 'src/modules/credential/entities/credential.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';

@Entity({ name: 'ecommerce' })
export class EcommerceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name', length: 50, nullable: true })
  name: string;

  @Column('character varying', { name: 'code', length: 50, nullable: true })
  code: string;

  @Column('character varying', { name: 'app_id', length: 50, nullable: true })
  appId: string;

  @Column('character varying', {
    name: 'client_secret',
    length: 50,
    nullable: true,
  })
  clientSecret: string;

  @Column('character varying', {
    name: 'redirect_uri',
    length: 255,
    nullable: true,
  })
  redirectUri: string;

  @ManyToOne(() => UserEntity, (user) => user.ecommerces)
  user: UserEntity;

  @OneToOne(() => CredentialEntity, (credential) => credential.ecommerce)
  credential: CredentialEntity;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => `now()`,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => `now()`,
  })
  updatedAt: Date;

  constructor(partial: Partial<EcommerceEntity>) {
    Object.assign(this, partial);
  }
}
