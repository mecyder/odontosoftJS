import { Body, Controller, Header, Post, Headers, Param } from '@nestjs/common';
import { OdontogramaService } from '../service/service';
import { Add } from '../dtos/add.dto';

@Controller('odontograma')
export class OdontogramaController {
  constructor(private odontogramaService: OdontogramaService) {}
  @Post()
  async add(
    @Body() odontograma: Add,
    @Headers() headers: any,
    @Param(':patientId') params: any,
  ) {
    return await this.odontogramaService.add(
      headers.companyid,
      params.patientId,
      odontograma,
    );
  }
}
