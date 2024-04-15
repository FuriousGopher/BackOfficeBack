import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CustomerModel } from './customer.model';
import { MeterModel } from './meter.model';

@Entity({ name: 'site' })
export class SiteModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  coordinates: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  post_code: string;

  @Index('site_created_at_index')
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', select: false })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    select: false,
  })
  deletedAt: Date;

  @ManyToOne(() => CustomerModel, (customer) => customer.sites)
  customer: CustomerModel;

  @OneToMany(() => MeterModel, (meter) => meter.site, { cascade: true })
  meters: MeterModel[];
}
