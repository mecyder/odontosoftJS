import { Body, Controller, Header, Post } from '@nestjs/common';
import { EmailService } from '../Service/email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) { }
  @Post()
  @Header('content-type', 'application/json')
  sendMail(@Body() body: any, to = '', subject = '') {
    return this.emailService.send(body, to, subject);
  }
}
