import { Module } from '@nestjs/common';
import { DoctorController } from './controller/controller';
import { doctorProviders } from './doctor.providers';
import { DatabaseModule } from '../database/database.module';
import { DoctorService } from './service/service.service';

@Module({
  controllers: [DoctorController],
  imports: [DatabaseModule],
  providers: [...doctorProviders, DoctorService],
  exports: [DoctorService]
})
export class DoctorModule { }
