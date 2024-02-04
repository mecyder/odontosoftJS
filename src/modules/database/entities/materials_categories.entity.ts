import { Column, Entity } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
@Entity()
export class MaterialsCategories extends CustomBaseEntity {
  @Column()
  description: string;
}
