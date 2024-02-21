import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShippingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column({ name: 'deliver_to', nullable: true })
  deliverTo: string;

  @Column({ nullable: true })
  status: string;

  @Column({ name: 'site_id', nullable: true })
  siteId: string;

  @Column('jsonb', { name: 'free_options', nullable: true })
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

  @Column({ name: 'currency_id',  nullable: true  })
  currencyId: string;
}
