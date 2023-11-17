import { Module } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { companyProviders } from './company.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [CompanyService],
  providers: [...companyProviders, CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule { }
