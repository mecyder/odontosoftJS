import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Clients } from './clients.entity';
import { CustomBaseEntity } from './base.entity';
import { Procedures } from './procedures.entity';

@Entity()
export class Odontograma extends CustomBaseEntity {
  @Column()
  tooth: number;
  @Column()
  symptoms: string;
  @Column()
  observations: string;
  @Column()
  isDone: boolean;

  @ManyToOne(() => Clients, (patients) => patients.odontograma)
  patients: Clients;

  @OneToOne(() => Procedures)
  @JoinColumn({ name: 'ProcedureId' })
  procedure: Procedures;
}
