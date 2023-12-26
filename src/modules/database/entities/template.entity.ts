import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
@Entity()
export class TEMPLATES extends CustomBaseEntity {
  @Column({ length: 30 })
  name: string;
  @Column()
  html: string;
}
