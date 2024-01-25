import { DataSource } from 'typeorm';
import { Template } from '../database/entities/template.entity';

export const templatesProviders = [
  {
    provide: 'TEMPLATE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Template),
    inject: ['DATA_SOURCE'],
  },
];
