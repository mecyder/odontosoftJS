// import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
// import { CustomBaseEntity } from '../base.entity';
// import { User } from './user.entity';
// import { Rol } from './rol.entity';
// import { View } from './view.entity';
// @Entity()
// export class Rols_Views extends CustomBaseEntity {
//   @OneToOne(() => Rol, (rol) => rol)
//   @JoinColumn({ name: 'rolId' })
//   rol: Rol;
//   @OneToOne(() => View, (view) => view.rols_view)
//   @JoinColumn({ name: 'viewId' })
//   view: View;
// }
