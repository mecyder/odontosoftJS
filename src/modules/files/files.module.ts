import { Module } from '@nestjs/common';
import { filesController } from './controller/controller.controller';
import { FilesService } from './services/files.service';
import { FileProvider } from './provider';
import { ClientsModule } from '../clients/clients.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [filesController],
  providers: [...FileProvider, FilesService],
  imports: [DatabaseModule, ClientsModule],
})
export class FilesModule {}
