import { Controller, Get, Param, Headers } from '@nestjs/common';
import { DoctorService } from '../service/service.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }
  @Get()
  async getList(@Param() params: any, @Headers() header: any) {
    return await this.doctorService.find(+header.companyid);
  }
}
