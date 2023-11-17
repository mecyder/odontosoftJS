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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
