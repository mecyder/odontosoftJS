import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { AppoinmentsModule } from './modules/appoinments/appoinments.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompanyModule } from './modules/company/company.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AilmentsModule } from './modules/ailments/ailments.module';
import { AilmentsController } from './modules/controller/ailments/ailments.controller';
import { TemplatesModule } from './modules/templates/templates.module';
import { EmailService } from './modules/email/Service/email.service';
import { EmailModule } from './modules/email/email.module';
import { VitalSignsModule } from './modules/vital-signs/vital-signs.module';
import { PhysycalExamsModule } from './modules/physycal-exams/physycal-exams.module';
import { PhysycalConditionsObservationsModule } from './modules/physycal-conditions-observations/physycal-conditions-observations.module';
import { ServiceService } from './modules/detail-procedures-performed/service/service.service';
import { DetailProceduresPerformedModule } from './modules/detail-procedures-performed/detail-procedures-performed.module';
import { OdontogramaModule } from './modules/odontograma/odontograma.module';
import { ProceduresModule } from './modules/procedures/procedures.module';
import { ServicesService } from './modules/services/services.service';
import { FilesModule } from './modules/files/files.module';
import { PrintService } from './modules/print/services/print.service';
import { PersonalBackgroundModule } from './modules/personal-background/personal-background.module';

@Module({
  imports: [
    ClientsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AppoinmentsModule,
    AuthModule,
    UsersModule,
    CompanyModule,
    DoctorModule,
    AilmentsModule,
    TemplatesModule,
    EmailModule,
    VitalSignsModule,
    PhysycalExamsModule,
    PhysycalConditionsObservationsModule,
    DetailProceduresPerformedModule,
    OdontogramaModule,
    ProceduresModule,
    FilesModule,
    PersonalBackgroundModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    ServiceService,
    ServicesService,
    PrintService,
  ],
})
export class AppModule {}
