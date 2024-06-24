import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrintService } from './modules/print/services/print.service';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private printService: PrintService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('print')
  @Public()
  print(): void {
    this.printService.print();
  }
}
