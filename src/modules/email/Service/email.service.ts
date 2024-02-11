import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer');
@Injectable()
export class EmailService {
  private _instance: EmailService;

  constructor() { }

  getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new EmailService();
  }
  send = async (data: string, to: string, subject: string) => {
    const transport = nodemailer.createTransport({
      auth: {
        user: 'subdirectoradjunto@gmail.com',
        pass: 'lvoj kuno hxta chyt',
      },
      port: 465, // port for secure SMTP

      secure: true, // true for 465, false for other ports
      logger: true,
      host: 'smtp.gmail.com',
      tls: { rejectUnauthorized: true },
    });

    // send the message and get a callback with an error or details of the message that was sent
    await transport.sendMail(
      {
        from: 'subdirectoradjunto@gmail.com', // sender address
        to, // list of receivers
        subject, // Subject line
        text: `${{ data }}`, // plain text body
        // html: `<b>${{ data }}</b>`, // html body
      },
      (err, info) => {
        if (err) {
          console.log('error sending Message : %s', err.message);
        }
        console.log('Message sent: %s', info);
      },
    );
    // transport.verify(function (error, success) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Server is ready to take our messages');
    //   }
    // });
  };
}
