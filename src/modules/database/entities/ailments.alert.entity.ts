import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Ailments } from './ailments.entity';

@Entity()
export class AilmentsAlerts extends CustomBaseEntity {
  @Column()
  description: string;
  @OneToOne(() => Ailments, (ailments) => ailments.ailmentsAlerts)
  @JoinColumn({ name: 'ailmentId' })
  ailments: Ailments;
}
