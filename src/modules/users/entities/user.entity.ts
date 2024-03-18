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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the user.',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({ example: 'John' })
  @Column('character varying', { name: 'name', length: 50, nullable: true })
  name: string;

  @ApiProperty({ example: 'Doe' })
  @Column('character varying', { name: 'lastname', length: 50, nullable: true })
  lastname: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column('character varying', {
    name: 'email',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: '123456789' })
  @Column('character varying', { name: 'number', length: 20, nullable: true })
  number: string;

  @ApiProperty({ enum: Roles, default: Roles.USER })
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  roles: Roles;

  @ApiProperty({ example: 'hashedPassword' })
  @Column('character varying', {
    name: 'password',
    length: 100,
    nullable: true,
  })
  password: string;

  @ApiProperty({ default: false })
  @Column('boolean', { name: 'deleted', default: false })
  deleted: boolean;

  @ApiProperty({ type: () => [EcommerceEntity] })
  @OneToMany(() => EcommerceEntity, (ecommerce) => ecommerce.user)
  ecommerces: EcommerceEntity[];

  @Exclude()
  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'createdAt',
    default: () => `now()`,
    onUpdate: `now()`,
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updatedAt',
    default: () => `now()`,
    onUpdate: `now()`,
  })
  updatedAt: Date;

  @Exclude()
  @ApiProperty()
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
