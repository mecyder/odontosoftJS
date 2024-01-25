import { Controller, Get, Headers, Param } from '@nestjs/common';
import { VitalSignsService } from '../service/service.service';

@Controller('vital-signs')
export class VitalSignsController {
  constructor(private service: VitalSignsService) {}
  @Get(':page/:pageSize')
  async findAll(@Param() params: any, @Headers() header: any): Promise<any> {
    return this.service.findAll(header.companyId, params.page, params.pageSize);
  }
  @Get(':patientId')
  async findOne(@Param() params: any, @Headers() header: any): Promise<any> {
    return this.service.findOne(params.patientId, header.companyId);
  }
}
