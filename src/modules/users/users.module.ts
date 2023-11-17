import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UserController } from './controller/controller.controller';
import { CompanyModule } from '../company/company.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [DatabaseModule, CompanyModule, DoctorModule],
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule { }
