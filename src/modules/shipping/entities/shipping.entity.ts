import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  type: string;

  @Column({ name: 'deliver_to', nullable: false })
  deliverTo: string;

  @Column({ nullable: false })
  status: string;

  @Column({ name: 'site_id', nullable: false })
  siteId: string;

  @Column('jsonb', { name: 'free_options', nullable: false })
  freeOptions: string[];

  @Column('jsonb', { name: 'shipping_modes', nullable: true })
  shippingModes: string[] | null;

  @Column({ name: 'company_id', nullable: true })
  companyId: number | null;

  @Column({ name: 'company_name', nullable: true })
  companyName: string | null;

  @Column({ name: 'min_time', nullable: true })
  minTime: number | null;

  @Column({ name: 'max_time', nullable: true })
  maxTime: number | null;

  @Column({ name: 'currency_id', nullable: false })
  currencyId: string;
}
