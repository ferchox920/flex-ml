import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Roles } from 'src/utils/common/roles-enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admins')
export class AdminEntity {
  @ApiProperty({ description: 'The unique identifier for the admin.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the admin.', maxLength: 50, required: false })
  @Column('character varying', { length: 50, nullable: true })
  name: string;

  @ApiProperty({ description: 'The lastname of the admin.', maxLength: 50, required: false })
  @Column('character varying', { length: 50, nullable: true })
  lastname: string;

  @ApiProperty({ description: 'The email of the admin.', maxLength: 100 })
  @Column('character varying', { length: 100, nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'The role of the admin.', enum: Roles, default: Roles.ADMIN })
  @Column({ type: 'enum', enum: Roles, default: Roles.ADMIN })
  roles: Roles;

  @ApiProperty({ description: 'The password of the admin.', maxLength: 100, required: false })
  @Column('character varying', { length: 100, nullable: true })
  password: string;

  @Exclude()
  @ApiProperty({ description: 'The creation date of the admin.' })
  @CreateDateColumn({ type: 'timestamptz', default: () => `now()`, onUpdate: `now()` })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the admin.' })
  @UpdateDateColumn({ type: 'timestamptz', default: () => `now()`, onUpdate: `now()` })
  updatedAt: Date;

  @Exclude()
  @ApiProperty({ description: 'The deletion date of the admin.' })
  @DeleteDateColumn({ type: 'timestamptz', onUpdate: `now()` })
  deletedAt?: Date;

  constructor(partial: Partial<AdminEntity>) {
    Object.assign(this, partial);
  }
}
