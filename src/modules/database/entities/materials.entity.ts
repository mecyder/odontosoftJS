import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { MaterialsCategories } from './materials_categories.entity';
import { Providers } from './providers.entity';
import { Company } from './company.entity';

@Entity()
export class Materials extends CustomBaseEntity {
  @Column()
  name: string;
  @Column()
  existing_units: number;
  @Column()
  minimum_amount: number;
  @Column()
  unit_price: number;
  @Column()
  due_date: Date;
  @Column()
  cost: number;

  @ManyToOne(() => MaterialsCategories)
  @JoinColumn({ name: 'categoryId' })
  category: MaterialsCategories;

  @ManyToOne(() => Providers)
  @JoinColumn({ name: 'providerId' })
  provider: Providers;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
