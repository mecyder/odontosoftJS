import { DataSource } from 'typeorm';
import { Company } from '../database/entities/index';

export const companyProviders = [
  {
    provide: 'COMPANY_REPOSITORY', 
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
    inject: ['DATA_SOURCE'],
  },
];
