import { Clients } from 'src/modules/database/entities/index';
import { appoimentsStatus } from 'src/shared/enums/appoiments-status.enum';

export interface IList {
  client: Clients;
  reason: string;
  date: Date;
  hour: Date;
  status: appoimentsStatus;
  createdBy: number;
}
