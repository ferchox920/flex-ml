import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
import { Roles } from 'src/utils/common/roles-enum';

  
  @Entity('admins')
  export class AdminEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('character varying', { length: 50, nullable: true })
    name: string;
  
    @Column('character varying', { length: 50, nullable: true })
    lastname: string;
  
    @Column('character varying', { length: 100, nullable: false, unique: true })
    email: string;

  
    @Column({ type: 'enum', enum: Roles, default: Roles.ADMIN })
    roles: Roles;
  
    @Column('character varying', { length: 100, nullable: true })
    password: string;

    @Exclude()
    @CreateDateColumn({ type: 'timestamptz', default: () => `now()`, onUpdate: `now()` })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => `now()`, onUpdate: `now()` })
    updatedAt: Date;
  
    @Exclude()
    @DeleteDateColumn({ type: 'timestamptz', onUpdate: `now()` })
    deletedAt?: Date;
  
    constructor(partial: Partial<AdminEntity>) {
      Object.assign(this, partial);
    }
  }
  