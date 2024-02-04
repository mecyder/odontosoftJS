import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomBaseEntity } from './base.entity';
import { Company } from './company.entity';

@Entity()
export class Providers extends CustomBaseEntity {
  @Column()
  name: string;
  @Column()
  identification: string;
  @Column()
  address: string;
  @Column()
  phone: string;
  @Column()
  email: string;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
