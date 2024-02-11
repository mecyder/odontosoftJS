import { Controller, Get, Param, Headers } from '@nestjs/common';
import { DoctorService } from '../service/service.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }
  @Get()
  @ApiResponse({ status: 200 })
  async getList(@Param() params: any, @Headers() header: any) {
    return await this.doctorService.find(+header.companyid);
  }
}
