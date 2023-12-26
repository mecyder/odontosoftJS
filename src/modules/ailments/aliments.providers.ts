import { DataSource } from 'typeorm';
import { Ailments } from '../database/entities/ailments.entity';

export const ailmentsProviders = [
  {
    provide: 'AILMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Ailments),
    inject: ['DATA_SOURCE'],
  },
];
