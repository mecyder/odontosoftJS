import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { IEdit, IAdd } from '../dtos';
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Get()
  async findAll(@Headers('companyId') companyid: any) {
    return this.clientsService.findAll(+companyid);
  }
  @Get(':id')
  async findById(@Param() params: any, @Headers('companyId') header: any) {
    return this.clientsService.findById(params.id, header.companyid);
  }
  @Get('/bycode/:code')
  async getByCode(@Param('code') params: string, @Headers() headers: any) {
    return this.clientsService.findByCode(params, +headers.companyid);
  }
  @Get('/byname/:name')
  async getByName(
    @Param('name') name: any,
    @Headers('companyid') companyid: any,
  ) {
    return this.clientsService.findByName(name, +companyid);
  }
  @Get('/byidentification/:identification')
  async getByIdentification(
    @Param() params: any,
    @Headers('companyid') companyid: any,
  ) {
    return this.clientsService.findByIdentification(
      params.identification,
      +companyid,
    );
  }
  @Post()
  async add(@Body() client: IAdd, @Headers() header: any) {
    return this.clientsService.add(client, +header.companyid, header.createby);
  }
  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: IEdit,
    @Headers() header: any,
  ) {
    return this.clientsService.edit(id, client, +header.companyid);
  }
}
