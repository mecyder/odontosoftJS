import { Module } from '@nestjs/common';
import { PersonalBackgroundController } from './controller/personal-background.controller';
import { PersonalBackgroundService } from './service/personal-background.service';
import { ClientsModule } from '../clients/clients.module';
import { personalProvider } from './provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [...personalProvider, PersonalBackgroundService],
  controllers: [PersonalBackgroundController],
  imports: [DatabaseModule, ClientsModule],
})
export class PersonalBackgroundModule { }
