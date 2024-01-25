import { Module } from '@nestjs/common';
import { TemplateService } from './services/service';
import { TemplateController } from './controller/controller.controller';
import { templatesProviders } from './tempate.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...templatesProviders, TemplateService],
  controllers: [TemplateController],
})
export class TemplatesModule {}
