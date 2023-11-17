import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CustomBaseEntity } from '../base.entity';
import { Rol } from './rol.entity';
import { Doctor } from './doctor.entity';
import { Company } from '../company.entity';
// import { Rols_Users } from './rols-users.entity';
@Entity()
export class User extends CustomBaseEntity {
  @Column({ length: 20, type: 'varchar' })
  username: string;
  @Column({ length: 200, type: 'varchar' })
  password: string;
  @Column({ type: 'timestamp', nullable: true })
  last_connection?: Date;

  @ManyToMany(() => Rol, (rol) => rol.user)
  @JoinTable()
  rols: Rol[];

  @OneToOne(() => Doctor, (doctor) => doctor.user)
  @JoinColumn({ name: 'doctorId' })
  doctor: Doctor;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
