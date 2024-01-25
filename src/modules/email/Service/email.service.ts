import { Injectable } from '@nestjs/common';
import nodemailer = require('nodemailer');
@Injectable()
export class EmailService {
  _instance: EmailService;

  constructor() {}

  getInstance() {
    if (this._instance) {
      return this._instance;
    }
    this._instance = this;
  }
  send = async (data: string) => {
    const transport = nodemailer.createTransport({
      auth: {
        user: 'subdirectoradjunto@gmail.com',
        pass: 'UJiTXyFtXMR8OeArEU8Kd9JOkErsRCJE',
      },
      port: 465, // port for secure SMTP

      secure: true, // true for 465, false for other ports
      logger: true,
      host: 'smtp.gmail.com',
      tls: { rejectUnauthorized: true },
    });

    // send the message and get a callback with an error or details of the message that was sent
    // await transport.sendMail(
    //   {
    //     from: 'subdirectoradjunto@gmail.com', // sender address
    //     to: 'wourena@apap.com.do', // list of receivers
    //     subject: 'Hello ✔', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: '<b>Hello world?</b>', // html body
    //   },
    //   (err, info) => {
    //     if (err) {
    //       console.log('error sending Message : %s', err.message);
    //     }
    //     console.log('Message sent: %s', info);
    //   },
    // );
    transport.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
  };
}
