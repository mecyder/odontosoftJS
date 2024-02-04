import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PhysicalConditionObservations } from '../database/entities/physical.conditions.observations.entity';

export const physicalConditionObservationsProvider = [
  {
    provide: 'PHYSYCAL_CONDITIONS_OBSERVATIONS_REPOSITORY',
    useFactory: (datasource: DataSource) =>
      datasource.getRepository(PhysicalConditionObservations),
    inject: ['DATA_SOURCE'],
  },
];
