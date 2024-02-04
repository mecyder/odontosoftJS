import { Module } from '@nestjs/common';
import { OdontogramaService } from './service/service';
import { OdontogramaController } from './controller/controller';
import { odontogramaProvider } from './provider';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule } from '../clients/clients.module';

@Module({
  providers: [OdontogramaService, ...odontogramaProvider],
  controllers: [OdontogramaController],
  imports: [DatabaseModule, ClientsModule],
})
export class OdontogramaModule {}
