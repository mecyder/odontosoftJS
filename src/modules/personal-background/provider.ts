import { DataSource } from 'typeorm';
import { PersonalBackground } from '../database/entities';

export const personalProvider = [
  {
    provide: 'PERSONAL_BACKGROUND_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PersonalBackground),
    inject: ['DATA_SOURCE'],
  },
];
