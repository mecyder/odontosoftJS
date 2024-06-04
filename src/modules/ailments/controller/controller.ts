import { Body, Controller, Param, Post, Headers, Get } from '@nestjs/common';
import { AilmentsService } from '../service/service.service';

@Controller('ailments')
export class AilmentsController {
  constructor(private ailmentsService: AilmentsService) {}
  @Post(':patientsId')
  async add(@Param() params: any, @Body() body: any, @Headers() headers: any) {
    return await this.ailmentsService.add(
      headers.companyid,
      body,
      params.patientsId,
      headers.createby,
    );
  }

  @Get(':patientId')
  async FindAll(@Headers() headers: any, @Param() params: any) {
    return this.ailmentsService.findAll(headers.companyid, params);
  }
}
