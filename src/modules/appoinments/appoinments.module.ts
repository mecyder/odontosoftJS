import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AppoinmentsService } from './services/appoinments.service';
import { appointmentsProviders } from './appoinmenst.providers';
import { AppoinmentController } from './controllers/appoinment.controller';
import { ClientsModule } from '../clients/clients.module';
import { CompanyModule } from '../company/company.module';
@Module({
    imports: [DatabaseModule, ClientsModule, CompanyModule],
    providers: [...appointmentsProviders, AppoinmentsService],
    controllers: [AppoinmentController],
})
export class AppoinmentsModule { }
