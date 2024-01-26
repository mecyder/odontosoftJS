import { Body, Controller, Headers } from '@nestjs/common';
import { PhysicalExamsService } from '../service/physical.exams-service';
import { IADD } from '../dtos/add.dto';

@Controller('physical.exams.controller')
export class PhysicalExamsController {
  constructor(private service: PhysicalExamsService) {}
  async add(@Body() payload: IADD, @Headers() headers: any) {
    return this.service.add(headers.companyid, payload, headers.createby);
  }
}
