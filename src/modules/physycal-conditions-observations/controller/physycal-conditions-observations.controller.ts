import { Body, Controller, Post, Headers, Param } from '@nestjs/common';
import { PhysicalConditionObservationsService } from '../service/service.service';
import { IADD } from '../dtos/add.dto';

@Controller('physycal-conditions-observations')
export class PhysycalConditionsObservationsController {
  constructor(private service: PhysicalConditionObservationsService) {}
  @Post(':pacienteId')
  async add(
    @Param() params: any,
    @Body() payload: IADD,
    @Headers() headers: any,
  ) {
    return this.service.add(
      headers.companyid,
      payload,
      headers.createby,
      params.pacienteId,
    );
  }
}
