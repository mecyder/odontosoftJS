import { Column, Entity, ManyToMany } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';
import { Doctor } from './doctor.entity';
@Entity()
export class Speciality extends CustomBaseEntity {
  @Column()
  description: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.specialities)
  doctors: Doctor[];
}
