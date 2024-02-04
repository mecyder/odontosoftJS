import { Body, Controller, Headers, Post } from '@nestjs/common';
import { PhysicalExamsService } from '../service/physical.exams-service';
import { IADD } from '../dtos/add.dto';

@Controller('physicalExams')
export class PhysicalExamsController {
  constructor(private service: PhysicalExamsService) {}
  @Post()
  async add(@Body() payload: IADD, @Headers() headers: any) {
    return this.service.add(headers.companyid, payload, headers.createby);
  }
}
