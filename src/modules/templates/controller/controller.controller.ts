import {
  Controller,
  Get,
  Header,
  Headers,
  Body,
  Post,
  Param,
} from '@nestjs/common';
import { TemplateService } from '../services/service';
import { IAdd } from '../dtos/add.dto';

@Controller('template')
export class TemplateController {
  constructor(private templateService: TemplateService) {}
  @Get()
  @Header('content-type', 'application/json')
  async getAll(@Headers() header: any) {
    return this.templateService.find(header.companyid);
  }
  @Get('/ByName/:name')
  @Header('content-type', 'application/json')
  async getByName(@Headers() header: any, @Param() params: any) {
    return this.templateService.findByName(params.name, header.companyid);
  }
  @Post()
  @Header('content-type', 'application/json')
  async add(@Headers() header: any, @Body() body: IAdd) {
    return this.templateService.add(header.companyid, body);
  }
}
