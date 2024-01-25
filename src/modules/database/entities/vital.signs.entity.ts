import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Clients } from './clients.entity';

@Entity()
export class VitalSings extends CustomBaseEntity {
  @Column()
  pulsations: number;
  @Column()
  minBreathingFrequency: number;
  @Column()
  minBloodPressure: number;
  @Column()
  hgWeight: number;

  @OneToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;
}
