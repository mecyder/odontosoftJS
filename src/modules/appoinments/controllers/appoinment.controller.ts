import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  Header,
  Put,
} from '@nestjs/common';
import { AppoinmentsService } from '../services/appoinments.service';
import { IADD } from '../dtos/add';

@Controller('appoinment')
export class AppoinmentController {
  constructor(private readonly appoinmentService: AppoinmentsService) { }
  @Post()
  @Header('content-type', 'application/json')
  async add(@Body() appoimentDto: IADD, @Headers() headers: any) {
    return await this.appoinmentService.add(
      appoimentDto,
      +headers.companyid,
      +headers.createby,
    );
  }
  @Get()
  @Header('content-type', 'application/json')
  async findAll(@Headers() headers: any) {
    return await this.appoinmentService.findAll(+headers.companyid);
  }
  @Get(':id')
  async findById(@Param() param: any) {
    return await this.appoinmentService.findById(param.id);
  }

  @Put(':id')
  async setStatus(@Body() body: any, @Headers() headers: any) {
    return await this.appoinmentService.updateReservationStatus({
      id: body.id,
      companyId: headers.companyid,
      statusCode: body.statusCode,
    });
  }

  @Put('setNewDate/:id')
  async setNewDateOrNewTime(
    @Param() params: any,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    return await this.appoinmentService.updateReservationDate({
      id: params.id,
      companyId: headers.companyid,
      newDate: body.newDate,
      starHour: body.starHour,
      updateType: body.updateType,
    });
  }
}
