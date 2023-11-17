import { DataSource } from 'typeorm';
import { Doctor } from '../database/entities/index';

export const doctorProviders = [
  {
    provide: 'DOCTOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Doctor),
    inject: ['DATA_SOURCE'],
  },
];
