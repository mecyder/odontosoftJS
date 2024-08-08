import { Body, Controller, Post, Headers, Get, Param } from '@nestjs/common';
import { PersonalBackgroundAdd } from '../dtos/add.input';
import { PersonalBackgroundService } from '../service/personal-background.service';

@Controller('personal-background')
export class PersonalBackgroundController {
  constructor(
    private readonly personalBackgroundService: PersonalBackgroundService,
  ) { }
  @Post()
  async add(@Body() payload: PersonalBackgroundAdd, @Headers() headers: any) {
    return await this.personalBackgroundService.add(
      payload,
      headers.companyid,
      headers.createby,
    );
  }
  @Get(':clientId')
  async get(@Param() params: any, @Headers() headers: any) {
    return this.personalBackgroundService.findOne(
      params.clientId,
      headers.companyid,
    );
  }
}
