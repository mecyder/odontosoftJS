// import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
// import { CustomBaseEntity } from '../base.entity';
// import { User } from './user.entity';
// import { Rol } from './rol.entity';
// @Entity()
// export class Rols_Users extends CustomBaseEntity {
//   @ManyToOne(() => User, (user) => user.rols_user)
//   @JoinColumn({ name: 'userId' })
//   user: User[];
//   @ManyToOne(() => Rol, (rol) => rol.rolUser)
//   @JoinColumn({ name: 'rolId' })
//   rols: Rol[];
// }
