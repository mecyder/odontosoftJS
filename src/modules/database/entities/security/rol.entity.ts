import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CustomBaseEntity } from '../base.entity';
import { User } from './user.entity';
import { View } from './view.entity';
@Entity()
export class Rol extends CustomBaseEntity {
  @Column({ length: 20, type: 'varchar' })
  description: string;

  @ManyToMany(() => User, (user) => user.rols)
  user: User[];
  @ManyToMany(() => View, (view) => view.rols)
  @JoinTable()
  view: View[];
}
