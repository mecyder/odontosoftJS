import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Company } from './company.entity';
@Entity()
export class Procedures extends CustomBaseEntity {
  @Column()
  description: string;
  @Column()
  price1: number;
  @Column()
  price2: number;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
