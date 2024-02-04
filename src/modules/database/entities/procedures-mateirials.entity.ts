import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Company, CustomBaseEntity } from '.';
import { Procedures } from './procedures.entity';
import { Materials } from './materials.entity';

@Entity()
export class Procedures_Materials extends CustomBaseEntity {
  @Column()
  productQty: number;

  @OneToOne(() => Procedures)
  @JoinColumn({ name: 'ProcedureId' })
  procedure: Procedures;

  @OneToOne(() => Materials)
  @JoinColumn({ name: 'MaterialId' })
  material: Materials;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
