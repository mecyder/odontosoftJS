import { DataSource } from 'typeorm';
import { Clients } from '../database/entities/index';

export const clientsProviders = [
  {
    provide: 'CLIENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Clients),
    inject: ['DATA_SOURCE'],
  },
];