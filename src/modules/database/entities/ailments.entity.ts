import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Clients } from './clients.entity';
import { AilmentsAlerts } from './ailments.alert.entity';

@Entity()
export class Ailments extends CustomBaseEntity {
  @Column({ default: false })
  hasCardiacDisorders: boolean;
  @Column({ default: false })
  hasMyocardialInarction: boolean;
  @Column({ default: false })
  hasheartMurmurs: boolean;
  @Column({ default: false })
  hasarterialhypertension: boolean;
  @Column({ default: false })
  hasArterialHypotension: boolean;
  @Column({ default: false })
  hasSinusitis: boolean;
  @Column({ default: false })
  hasPsychiatricTreatment: boolean;
  @Column({ default: false })
  hasDepressions: boolean;
  @Column({ default: false })
  hasJaundice: boolean;
  @Column({ default: false })
  hasasthma: boolean;
  @Column({ default: false })
  hasrespiratoryDistress: boolean;
  @Column({ default: false })
  hasTuberculosis: boolean;
  @Column({ default: false })
  hasBronquitis: boolean;
  @Column({ default: false })
  hasHepatitis: boolean;
  @Column({ default: false })
  hasCirrhosis: boolean;
  @Column({ default: false })
  hasAnemia: boolean;
  @Column({ default: false })
  hasLeukemia: boolean;
  @Column({ default: false })
  hasGastritis: boolean;
  @Column({ default: false })
  hasDiabetes: boolean;
  @Column({ default: false })
  hashasArtritis: boolean;
  @Column({ default: false })
  hasApoplexy: boolean;
  @Column({ default: false })
  hasEpilepsy: boolean;
  @Column({ default: false })
  hasSeizures: boolean;
  @Column({ default: false })
  hasHypothyroidism: boolean;
  @Column({ default: false })
  hashyperthyroidism: boolean;
  @Column({ default: false })
  hasAIDS: boolean;
  @Column({ default: false })
  hasETS: boolean;

  @OneToOne(() => Clients)
  @JoinColumn({ name: 'clientId' })
  client: Clients;

  @OneToOne(() => AilmentsAlerts, (ailmentsAlerts) => ailmentsAlerts.ailments)
  ailmentsAlerts: AilmentsAlerts;
}
