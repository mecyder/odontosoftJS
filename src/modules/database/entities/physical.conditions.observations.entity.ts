import { Entity, JoinColumn, OneToOne, Column } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Clients } from './clients.entity';

@Entity()
export class PhysicalConditionObservations extends CustomBaseEntity {
  @Column()
  description: string;

  @OneToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;
}
