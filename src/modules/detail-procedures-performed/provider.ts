import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Odontograma } from '../database/entities/odontograma.entity';

export const detailsProceduresPerformedProvider = [
  {
    provide: 'DETAILS_PROCEDURE_PERFORMED_REPOSITORY',
    userFactory: (datasource: DataSource) =>
      datasource.getRepository(Odontograma),
    inject: ['DATA_SOURCE'],
  },
];
