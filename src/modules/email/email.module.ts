import { Module } from '@nestjs/common';
import { EmailService } from './Service/email.service';
import { EmailController } from './controller/email.controller';

@Module({
  exports: [EmailService],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
