import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ShippingEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the shipping record.',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'shipped',
    description: 'The general status of the shipping.',
  })
  @Column()
  status: string;

  @ApiProperty({
    example: 'in_transit',
    description: 'The detailed shipping status.',
  })
  @Column()
  shipping_status: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'The tracking number for the shipment.',
  })
  @Column()
  tracking_number: string;

  @ApiProperty({
    example: 'standard',
    description: 'The method used for shipping.',
  })
  @Column()
  shipping_method: string;

  @ApiProperty({
    example: 123,
    description: 'The unique identifier of the associated order.',
  })
  @Column()
  order_id: number;

  @ApiProperty({
    example: 50.99,
    description: 'The total cost of shipping for the order.',
  })
  @Column()
  order_cost: number;

  @ApiProperty({ example: 10.0, description: 'The base cost of shipping.' })
  @Column()
  base_cost: number;

  @ApiProperty({
    example: 'US',
    description: 'The site ID or country code associated with the shipping.',
  })
  @Column()
  site_id: string;

  @ApiProperty({
    example: '2024-03-05T12:00:00Z',
    description: 'The creation timestamp of the ecommerce.',
  })
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => `now()`,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-05T12:30:00Z',
    description: 'The last update timestamp of the ecommerce.',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => `now()`,
  })
  updatedAt: Date;

  constructor(partial: Partial<ShippingEntity>) {
    Object.assign(this, partial);
  }
}
