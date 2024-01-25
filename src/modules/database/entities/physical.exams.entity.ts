import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Clients } from './clients.entity';

@Entity()
export class PhysicalExam extends CustomBaseEntity {
  @Column()
  head: string;
  @Column()
  face: string;
  @Column()
  neck: string;
  @Column()
  language: string;
  @Column()
  palate: string;
  @Column()
  other: string;
  @OneToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;
}
