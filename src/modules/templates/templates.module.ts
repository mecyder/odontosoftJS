import { Module } from '@nestjs/common';
import { TemplateService } from './services/service';
import { ControllerController } from './controller/controller.controller';
import { templatesProviders } from './tempate.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...templatesProviders, TemplateService],
  controllers: [ControllerController],
})
export class TemplatesModule {}
