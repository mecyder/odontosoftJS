import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ailmentsProviders } from './aliments.providers';
import { AilmentsController } from './controller/controller';
import { AilmentsService } from './service/service.service';
import { ClientsModule } from '../clients/clients.module';

@Module({
  imports: [DatabaseModule, ClientsModule],
  exports: [AilmentsService],
  providers: [...ailmentsProviders, AilmentsService],
  controllers: [AilmentsController, AilmentsController],
})
export class AilmentsModule {}
