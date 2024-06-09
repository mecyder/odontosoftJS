import { Column, Entity, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Clients } from './clients.entity';
import { appoimentsStatus } from 'src/shared/enums/appoiments-status.enum';
import { Company } from './company.entity';
import { Doctor } from './security/doctor.entity';

@Entity()
export class Appointment extends CustomBaseEntity {
  @Column({ type: 'varchar' })
  title: string;
  @Column({ length: 300 })
  reason: string;
  @Column({ type: 'timestamptz', nullable: true })
  start: Date;
  @Column({ type: 'timestamptz', nullable: true })
  end: Date;
  @Column({ type: 'varchar' })
  startTime: string;
  @Column({ type: 'varchar' })
  endTime: string;
  @Column({
    type: 'enum',
    enum: appoimentsStatus,
    default: appoimentsStatus.Reservada,
    nullable: true,
  })
  appointmentStatus: appoimentsStatus;
  @ManyToOne(() => Clients, (Client) => Client.appointment)
  client: Clients;

  @ManyToOne(() => Company, (company) => company.patients)
  company: Company;

  @ManyToOne(() => Doctor, (doctor) => doctor.appoiment)
  doctor: Doctor;
}
