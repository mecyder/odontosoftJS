import { Injectable } from '@nestjs/common';
import receiptio from 'receiptio';

@Injectable()
export class PrintService {
  print() {
    const receiptmd = `^^^RECEIPT
12/18/2021, 11:22:33 AM
Asparagus | 1| 1.00
Broccoli  | 2| 2.00
Carrot    | 3| 3.00
---
^TOTAL | ^6.00`;

    receiptio
      .print(receiptmd, '-d 192.168.192.168 -p escpos -c 42')
      .then((result) => {
        console.log(result);
      });
  }
}
