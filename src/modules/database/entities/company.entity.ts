import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { User } from './security';
import { Clients } from './clients.entity';
import { Appointment } from './appointment.entity';
@Entity()
export class Company extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 350 })
  address: string;
  @Column({ type: 'varchar', length: 10 })
  phone: string;
  @Column({ type: 'varchar', length: 11 })
  identification: string;
  @Column({ type: 'varchar', nullable: true })
  logo: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  slogan: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 150, nullable: true })
  urlPage: string;

  @OneToMany(() => User, (user) => user.company)
  users?: User[];

  @OneToMany(() => Clients, (patients) => patients.company)
  patients?: Clients[];

  @OneToMany(() => Appointment, (appoinment) => appoinment.company)
  appoinments?: Appointment[];
}
