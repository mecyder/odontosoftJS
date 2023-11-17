import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { IADD } from 'src/modules/users/interfaces';
import { Public } from 'src/modules/auth/decorator/meta-data-decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) { }
  @Get(':companyId')
  async getAll(@Param() params: any) {
    return await this.userService.findAll(params.companyId);
  }
  @Post()
  @Public()
  async add(@Body() User: IADD, @Param() params: any) {
    return await this.userService.add(User, params.companyId);
  }
}
