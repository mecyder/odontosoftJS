import { Module } from '@nestjs/common';
import { PhysicalExamsService } from './service/physical.exams-service';
import { PhysicalExamsController } from './controller/physical.exams.controller';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule } from '../clients/clients.module';
import { physicalExmamsProvider } from './provider';
@Module({
  providers: [...physicalExmamsProvider, PhysicalExamsService],
  imports: [DatabaseModule, ClientsModule],
  controllers: [PhysicalExamsController],
})
export class PhysycalExamsModule { }
