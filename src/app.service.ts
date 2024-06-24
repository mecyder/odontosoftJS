import { Get, Injectable } from '@nestjs/common';
import { PrintService } from './modules/print/services/print.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
