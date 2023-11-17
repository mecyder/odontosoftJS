import { DataSource } from 'typeorm';
import { Appointment } from '../database/entities/index';

export const appointmentsProviders = [
  {
    provide: 'APPOINMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Appointment),
    inject: ['DATA_SOURCE'],
  },
];
