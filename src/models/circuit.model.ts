import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { MeterModel } from './meter.model';

@Entity({ name: 'circuit' })
export class CircuitModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'boolean' })
  is_main: boolean;

  @Column({ name: 'installation_date', type: 'timestamptz', nullable: false })
  installationDate: Date;

  @Index('circuit_created_at_index')
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', select: false })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    select: false,
  })
  deletedAt: Date;

  @ManyToOne(() => MeterModel, (meter) => meter.circuits)
  meter: MeterModel;
}
