import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { IADD } from 'src/modules/users/interfaces';
import { Public } from 'src/modules/auth/decorator/meta-data-decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) { }
  @Get(':companyId')
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Headers('companyId') header: any,
  ) {
    return await this.userService.findAll(header.companyId, {
      limit,
      page,
    });
  }
  @Post()
  @Public()
  async add(@Body() User: IADD, @Param() params: any) {
    return await this.userService.add(User, params.companyId);
  }
}
