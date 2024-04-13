import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SiteModel } from './site.model';
import { CircuitModel } from './circuit.model';

@Entity({ name: 'meter' })
export class MeterModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    name: 'serial_number',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  serialNumber: string;

  @Column({ name: 'installation_date', nullable: false })
  installationDate: Date;

  @Index('meter_created_at_index')
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

  @ManyToOne(() => SiteModel, (site) => site.meters)
  site: SiteModel;

  @OneToMany(() => CircuitModel, (circuit) => circuit.meter)
  circuits: CircuitModel[];
}
