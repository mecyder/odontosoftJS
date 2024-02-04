import { Module } from '@nestjs/common';
import { PhysycalConditionsObservationsController } from './controller/physycal-conditions-observations.controller';
import { PhysicalConditionObservationsService } from './service/service.service';
import { physicalConditionObservationsProvider } from './provider';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  controllers: [PhysycalConditionsObservationsController],
  imports: [DatabaseModule, ClientsModule],
  providers: [
    ...physicalConditionObservationsProvider,
    PhysicalConditionObservationsService,
  ],
})
export class PhysycalConditionsObservationsModule {}
