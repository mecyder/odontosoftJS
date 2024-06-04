import { DataSource } from 'typeorm';
import { Files } from '../database/entities';

export const FileProvider = [
  {
    provide: 'FILES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Files),
    inject: ['DATA_SOURCE'],
  },
];
