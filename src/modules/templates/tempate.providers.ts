import { DataSource } from 'typeorm';
import { TEMPLATES } from '../database/entities/template.entity';

export const templatesProviders = [
  {
    provide: 'TEMPLATE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TEMPLATES),
    inject: ['DATA_SOURCE'],
  },
];
