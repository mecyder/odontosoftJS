import { DataSource } from 'typeorm';
import { PhysicalExam } from '../database/entities';
import { Inject } from '@nestjs/common';

export const physicalExmamsProvider = [
  {
    provide: 'PHYSYCAL_EXAMNS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PhysicalExam),
    inject: ['DATA_SOURCE'],
  },
];
