import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
@Entity()
export class Template extends CustomBaseEntity {
  @Column({ length: 30 })
  name: string;
  @Column()
  html: string;
  @Column({ name: 'companyId' })
  companyId: number;
}
