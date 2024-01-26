import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { VitalSignsService } from '../service/service';
import { IAdd } from '../dtos/add.dto';

@Controller('vital-signs')
export class VitalSignsController {
  constructor(private service: VitalSignsService) {}
  @Get(':page/:pageSize')
  async findAll(@Param() params: any, @Headers() header: any): Promise<any> {
    return this.service.findAll(header.companyid, params.page, params.pageSize);
  }
  @Get(':patientId')
  async findOne(@Param() params: any, @Headers() header: any): Promise<any> {
    return this.service.findOne(params.patientId, header.companyid);
  }

  @Post()
  async add(@Body() payload: IAdd, @Headers() header: any) {
    return await this.service.add(header.companyid, payload, header.createby);
  }
}
