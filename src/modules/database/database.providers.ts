import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST') ?? 'localhost',
        port: +configService.get<string>('POSTGRES_PORT') ?? 5432,
        username: configService.get<string>('POSTGRES_USER') ?? 'postgres',
        password: configService.get<string>('POSTGRES_PASSWORD') ?? 'postgres',
        database: configService.get<string>('POSTGRES_DB') ?? 'odontosoftDBF',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        logging: false,
        synchronize: configService.get<boolean>('SYNCHONIZE') ?? false,
      });

      return dataSource.initialize();
    },
  },
];
