import {
  Body,
  Controller,
  Header,
  Post,
  Headers,
  Param,
  Get,
} from '@nestjs/common';
import { OdontogramaService } from '../service/service';
import { Add } from '../dtos/add.dto';

@Controller('odontograma')
export class OdontogramaController {
  constructor(private odontogramaService: OdontogramaService) { }
  @Post(':patientId')
  async add(
    @Body() odontograma: Add,
    @Headers() headers: any,
    @Param() params: any,
  ) {
    return await this.odontogramaService.add(
      headers.companyid,
      params.patientId,
      odontograma,
      headers.createby,
    );
  }

  @Get(':patientId')
  async findAll(@Headers() headers: any, @Param() params: any) {
    return this.odontogramaService.findAll(headers.companyid, params.patientId);
  }
}
