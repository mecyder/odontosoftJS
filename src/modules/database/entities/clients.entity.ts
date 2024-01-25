import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { ClientTypeEnum } from 'src/modules/clients/enums/types';
import { SexEnum } from 'src/modules/clients/enums/sex';
import { Appointment, Doctor, PersonalBackground } from './index';
import { Company } from './company.entity';
import { Ailments } from './ailments.entity';
import { VitalSings } from './vital.signs.entity';
import { PhysicalExam } from './physical.exams.entity';

@Entity()
export class Clients extends CustomBaseEntity {
  @Column({ length: 250 })
  name: string;

  @Column('varchar')
  code: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ length: 10 })
  movil: string;

  @Column({
    type: 'enum',
    enum: SexEnum,
    default: SexEnum.Masculino,
  })
  sex: string;

  @Column({ type: 'boolean', default: false })
  hasWhatsapp: boolean;

  @Column({ length: 11 })
  identification: string;

  @Column({ length: 250 })
  email: string;

  @Column({ length: 350 })
  address: string;

  @Column({ type: 'date' })
  birthDay: Date;

  @Column({
    type: 'enum',
    enum: ClientTypeEnum,
    default: ClientTypeEnum.prospect,
  })
  type: ClientTypeEnum;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ length: 150, nullable: true })
  profession: string;

  @Column({ length: 250, nullable: true })
  emergency_contact_name: string;

  @Column({ length: 10, nullable: true })
  emergency_contact_phone: string;

  @Column({ length: 10, nullable: true })
  emergency_contact_movil: string;

  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointment: Appointment[];

  @ManyToOne(() => Doctor, (doctor) => doctor.patients, { nullable: true })
  doctor: Doctor;
  @BeforeInsert()
  private setCreateDate(): void {
    this.createAt = new Date();
  }

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.modifyAt = new Date();
  }

  //TODO: relaciones a crear
  //   contactOfEmergency
  //   categoria
  //   personalHistory
  //   implantology

  @ManyToOne(() => Company, (company) => company.patients)
  company: Company;

  @OneToOne(
    () => PersonalBackground,
    (personalBackground) => personalBackground.client,
  ) // specify inverse side as a second parameter
  personalBackground: PersonalBackground;
  @OneToOne(() => Ailments, (ailments) => ailments.client)
  ailments: Ailments;

  @OneToOne(() => VitalSings, (vital_sings) => vital_sings.client)
  vital_sings: VitalSings;

  @OneToOne(() => PhysicalExam, (physicalExam) => physicalExam.client)
  physicalExam: PhysicalExam;
}
