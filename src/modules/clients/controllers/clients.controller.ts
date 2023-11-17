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
  async findAll() {
    return this.clientsService.findAll();
  }
  @Get(':id')
  async findById(@Param() params: any, @Headers() header: any) {
    return this.clientsService.findById(params.id, header.companyId);
  }
  @Get('/bycode/:code')
  async getByCode(
    @Param() params: any,
    @Headers('companyId') companyId: number,
  ) {
    const { code } = params;
    return this.clientsService.findByCode(code, companyId);
  }
  @Get('/byname/:name')
  async getByName(@Param() params: any) {
    return this.clientsService.findByName(params.name);
  }
  @Get('/byidentification/:identification')
  async getByIdentification(@Param() params: any) {
    return this.clientsService.findByIdentification(params.identification);
  }
  @Post()
  async add(@Body() client: IAdd, @Headers() header: any) {
    return this.clientsService.add(client, header.companyid, header.createby);
  }
  @Put(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: IEdit,
    @Headers() header: any,
  ) {
    return this.clientsService.edit(id, client, header.companyId);
  }
}
