import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Column({ type: 'timestamp' })
  createAt: Date;

  @Column({ type: 'varchar' })
  createBy: number;

  @UpdateDateColumn()
  @Column({ type: 'timestamp', nullable: true })
  modifyAt: Date;

  @Column({ type: 'varchar', nullable: true })
  modifyBy: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
