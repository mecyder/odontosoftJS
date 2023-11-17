import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';
import { Rol } from './rol.entity';
@Entity()
export class View extends CustomBaseEntity {
  @Column({ length: 20, type: 'varchar' })
  description: string;
  @ManyToMany(() => Rol, (rol) => rol.view)
  rols: Rol[];
}
