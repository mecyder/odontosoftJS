import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';
import { Speciality } from './speciality.entity';
import { User } from './user.entity';

@Entity()
export class Doctor extends CustomBaseEntity {
  @Column({ length: 100, type: 'varchar' })
  name: string;
  @Column({ length: 250, type: 'varchar' })
  address: string;
  @Column({ length: 10, type: 'varchar' })
  phone: string;
  @Column({ length: 10, type: 'varchar' })
  movil: string;
  @Column({ length: 100, type: 'varchar' })
  email: string;
  @Column({ length: 11, type: 'varchar' })
  identification: string;
  @Column({ length: 100, type: 'varchar', nullable: true })
  authorizationNumber: string;

  @ManyToMany(() => Speciality, (speciality) => speciality.doctors)
  @JoinTable()
  specialities: Speciality[];

  @OneToOne(() => User, (user) => user.doctor)
  user: User;
}
