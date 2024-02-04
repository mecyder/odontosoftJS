import { Module } from '@nestjs/common';
import { DetailProceduresPerformedController } from './controller/controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [DetailProceduresPerformedController],
  imports: [DatabaseModule],
})
export class DetailProceduresPerformedModule {}
