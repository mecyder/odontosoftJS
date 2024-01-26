import { Module } from '@nestjs/common';
import { VitalSignsController } from './controller/controller.controller';
import { VitalSignsService } from './service/service';
import { vitalSingsProviders } from './vital.signs.providers';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  controllers: [VitalSignsController],
  imports: [ClientsModule, DatabaseModule],
  providers: [...vitalSingsProviders, VitalSignsService],
})
export class VitalSignsModule {}
