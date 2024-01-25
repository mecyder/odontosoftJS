import { DataSource } from 'typeorm';
import { VitalSings } from '../database/entities';

export const vitalSingsProviders = [
  {
    provide: 'VITALSIGNS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VitalSings),
    inject: ['DATA_SOURCE'],
  },
];
