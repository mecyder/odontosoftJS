import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppoinmentsService } from './services/appoinments.service';
import { appointmentsProviders } from './appoinmenst.providers';
import { AppoinmentController } from './controllers/appoinment.controller';
import { ClientsModule } from '../clients/clients.module';
import { CompanyModule } from '../company/company.module';
import { DoctorModule } from '../doctor/doctor.module';
import { EmailModule } from '../email/email.module';
import { TemplatesModule } from '../templates/templates.module';
@Module({
  imports: [
    DatabaseModule,
    ClientsModule,
    CompanyModule,
    DoctorModule,
    EmailModule,
    TemplatesModule,
  ],
  providers: [...appointmentsProviders, AppoinmentsService],
  controllers: [AppoinmentController],
})
export class AppoinmentsModule {}
