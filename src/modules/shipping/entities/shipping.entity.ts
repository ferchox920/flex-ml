import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShippingEntity {


  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  shipping_status: string;

  @Column()
  tracking_number: string;

  @Column()
  shipping_method: string;

  @Column()
  order_id: number;

  @Column()
  order_cost: number;

  @Column()
  base_cost: number;

  @Column()
  site_id: string;

  @Column()
  created_at: Date;
}
