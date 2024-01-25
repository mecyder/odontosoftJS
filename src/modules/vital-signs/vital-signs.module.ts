import { Module } from '@nestjs/common';
import { VitalSignsController } from './controller/controller.controller';
import { VitalSignsService } from './service/service.service';
import { vitalSingsProviders } from './vital.signs.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [VitalSignsController],
  imports: [DatabaseModule],
  providers: [...vitalSingsProviders, VitalSignsService],
})
export class VitalSignsModule { }
