import { DataSource } from 'typeorm';
import { Odontograma } from '../database/entities';

export const odontogramaProvider = [
  {
    provide: 'ODONTOGRAMA_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Odontograma),
    inject: ['DATA_SOURCE'],
  },
];
