import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MensualFrequencyEnum } from '../../../shared/enums/menstrual-frequency';
import { Clients } from './clients.entity';
import { CustomBaseEntity } from './base.entity';

@Entity()
export class PersonalBackground extends CustomBaseEntity {
  @Column({ type: 'boolean', nullable: true })
  question1: boolean;
  @Column({ type: 'varchar', nullable: true })
  coment1: string;
  @Column({ type: 'boolean', nullable: true })
  question2: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment2: string;
  @Column({ type: 'boolean', nullable: true })
  question3: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment3: string;
  @Column({ type: 'boolean', nullable: true })
  question4: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment4: string;
  @Column({ type: 'boolean', nullable: true })
  question5: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment5: string;
  @Column({ type: 'boolean', nullable: true })
  question6: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment6: string;
  @Column({ type: 'boolean', nullable: true })
  question7: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment7: string;
  @Column({ type: 'boolean', nullable: true })
  question8: boolean;
  @Column({ type: 'varchar', nullable: true })
  comment8: string;
  @Column({
    type: 'varchar',
    default: 'regular',
  })
  menstrualFrequency: string;
  @Column({ type: 'date' })
  lastPeriodDate: Date;
  @Column({ type: 'boolean', default: false })
  isPregnant: boolean;
  @Column({ type: 'integer' })
  numberOfWeeks: number;
  @Column({ type: 'boolean', default: false })
  isBreastfeeding: boolean;

  @OneToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;
}
