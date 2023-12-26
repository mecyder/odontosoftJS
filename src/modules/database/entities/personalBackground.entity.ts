import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MensualFrequency } from '../../../shared/enums/menstrual-frequency';
import { Clients } from './clients.entity';
import { CustomBaseEntity } from './base.entity';
@Entity()
export class PersonalBackground extends CustomBaseEntity {
  @Column({ type: 'varchar', nullable: true })
  question1: string;
  @Column({ type: 'varchar', nullable: true })
  coment1: string;
  @Column({ type: 'varchar', nullable: true })
  question2: string;
  @Column({ type: 'varchar', nullable: true })
  comment2: string;
  @Column({ type: 'varchar', nullable: true })
  question3: string;
  @Column({ type: 'varchar', nullable: true })
  comment3: string;
  @Column({ type: 'varchar', nullable: true })
  question4: string;
  @Column({ type: 'varchar', nullable: true })
  comment4: string;
  @Column({ type: 'varchar', nullable: true })
  question5: string;
  @Column({ type: 'varchar', nullable: true })
  comment5: string;
  @Column({ type: 'varchar', nullable: true })
  question6: string;
  @Column({ type: 'varchar', nullable: true })
  comment6: string;
  @Column({ type: 'varchar', nullable: true })
  question7: string;
  @Column({ type: 'varchar', nullable: true })
  comment7: string;
  @Column({ type: 'varchar', nullable: true })
  question8: string;
  @Column({ type: 'varchar', nullable: true })
  comment8: string;
  @Column({
    type: 'enum',
    enum: MensualFrequency,
    default: MensualFrequency.Regular,
  })
  menstrualFrequency: MensualFrequency;
  @Column({ type: 'date' })
  lastPeriodDate: Date;
  @Column({ type: 'boolean', default: false })
  isPregnant: boolean;
  @Column({ type: 'integer' })
  numberOfWeeks: number;
  @Column({ type: 'boolean', default: false })
  isBreastfeeding: string;

  @OneToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;
}
