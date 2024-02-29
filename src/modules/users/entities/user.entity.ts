import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { EcommerceEntity } from 'src/modules/ecommerces/entities/ecommerce.entity';
import { Roles } from 'src/utils/common/roles-enum';


@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('character varying', { name: 'name', length: 50, nullable: true })
  name: string;
  @Column('character varying', { name: 'lastname', length: 50, nullable: true })
  lastname: string;

  @Column('character varying', {
    name: 'email',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('character varying', { name: 'number', length: 20, nullable: true })
  number: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  roles: Roles;

  @Column('character varying', {
    name: 'password',
    length: 100,
    nullable: true,
  })
  password: string;

  //   @Column('boolean', { name: 'isVerified', default: false })
  //   isVerified: boolean;

  //   @Column('boolean', { name: 'isRegister', default: false })
  //   isRegister: boolean;

  @Column('boolean', { name: 'deleted', default: false })
  deleted: boolean;

  @OneToMany(() => EcommerceEntity, (ecommerce) => ecommerce.user)
  ecommerces: EcommerceEntity[];

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'createdAt',
    default: () => `now()`,
    onUpdate: `now()`,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updatedAt',
    default: () => `now()`,
    onUpdate: `now()`,
  })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deletedAt',
    onUpdate: `now()`,
  })
  deletedAt?: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
